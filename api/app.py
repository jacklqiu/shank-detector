import io
import numpy as np
import requests
from PIL import Image
from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore, storage, db
from datetime import datetime, date
from json import dumps
# Some basic setup:
# Setup detectron2 logger
import detectron2
from detectron2.utils.logger import setup_logger

# import some common libraries
import numpy as np
import os, json, cv2, random
from flask_ngrok import run_with_ngrok

# import some common detectron2 utilities
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog, DatasetCatalog
from detectron2.utils.visualizer import ColorMode    
from matplotlib import pyplot as plt
from prediction import predict_from_img
setup_logger()

cred = credentials.Certificate("firebase.json")
firebase_admin.initialize_app(cred, {'storageBucket': 'ichack-2022.appspot.com', "databaseURL": "https://ichack-2022-default-rtdb.firebaseio.com/"})


# Example
# img = predict("./photos/2022-02-05-232238.jpg")
# plt.imshow(img)
# plt.show()

def prepare_image(img):
    img = Image.open(io.BytesIO(img))
    img = np.array(img)
    return img

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))


app = Flask(__name__)
run_with_ngrok(app)
  

@app.route('/predict', methods=['POST'])
def infer_image():
    print("Received")
    request_body = request.json
    if 'image_url' not in request_body or 'longitude' not in request_body or 'latitude' not in request_body:
        return "Please try again. The Image doesn't exist", 400
    print("Got request")
    image_url = request_body["image_url"]
    longitude = request_body["longitude"]
    latitude = request_body["latitude"]
    print("Decoded request")
    img_data = requests.get(image_url).content
    # print(img_data)
    print("Got image")
    # img_bytes = img_data.read()
    img = prepare_image(img_data)
    # print(img.shape)
    # cv2.imshow('img', img)
    # cv2.waitKey()
    prediction, prediction_outcome = predict_from_img(img)
    prediction_im = Image.fromarray(prediction)
    prediction_im.save('test.jpg')
    # if (prediction_outcome):
    bucket = storage.bucket()
    blob = bucket.blob('test')
    blob.upload_from_filename('test.jpg')

    # Opt : if you want to make public access from the URL
    blob.make_public()
    prediction_url = blob.public_url

    ## store in firebase database {longitude, latitude, prediction_url}
    points_ref = db.reference('points')
    points_ref.push({
        'title': 'incident', 
        'longitude': longitude,
        'latitude': latitude,
        'image_url': prediction_url,
        'timestamp': dumps(datetime.now(), default=json_serial)
    })

    return str(prediction_outcome)
    

@app.route('/', methods=['GET'])
def index():
    return 'Machine Learning Inference'


if __name__ == '__main__':
    app.run()