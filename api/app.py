import flask
import io
import string
import time
import os
import numpy as np
import tensorflow as tf
from PIL import Image
from flask import Flask, jsonify, request

def predict_img(file_path: str):
  cfg = get_cfg()
  cfg.OUTPUT_DIR = "./model_weights"
  cfg.MODEL.WEIGHTS = os.path.join(cfg.OUTPUT_DIR, "model_final.pth")  # path to the model we just trained
  cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.8   # set a custom testing threshold
  predictor = DefaultPredictor(cfg)
  im = cv2.imread(file_path)
  im = cv2.cvtColor(im, cv2.COLOR_BGR2RGB)
  outputs = predictor(im)  # format is documented at https://detectron2.readthedocs.io/tutorials/models.html#model-output-format
  v = Visualizer(im[:, :, ::-1],
              #  MetadataCatalog.get("knife_train"),
                   scale=0.5)
  print(len(outputs['instances']))
  out = v.draw_instance_predictions(outputs["instances"].to("cpu"))
  output_image = out.get_image()[:, :, ::-1]
  return output_image

# Example
# img = predict("./photos/2022-02-05-232238.jpg")
# plt.imshow(img)
# plt.show()

def prepare_image(img):
    img = Image.open(io.BytesIO(img))
    img = img.resize((224, 224))
    img = np.array(img)
    img = np.expand_dims(img, 0)
    return img


def predict_result(img):
    return 1 if model.predict(img)[0][0] > 0.5 else 0


app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def infer_image():
    if 'file' not in request.files:
        return "Please try again. The Image doesn't exist"
    
    file = request.files.get('file')

    if not file:
        return

    img_bytes = file.read()
    img = prepare_image(img_bytes)

    return jsonify(prediction=predict_result(img))
    

@app.route('/', methods=['GET'])
def index():
    return 'Machine Learning Inference'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')