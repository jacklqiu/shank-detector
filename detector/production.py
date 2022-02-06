import torch
# Some basic setup:
# Setup detectron2 logger
import detectron2
from detectron2.utils.logger import setup_logger
setup_logger()

# import some common libraries
import numpy as np
import os, json, cv2, random

# import some common detectron2 utilities
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog, DatasetCatalog
from detectron2.utils.visualizer import ColorMode    
from matplotlib import pyplot as plt

# plt.rcParams['figure.figsize'] = [30, 15]

# Inference should use the config with parameters that are used in training
# cfg now already contains everything we've set previously. We changed it a little bit for inference:

def predict(file_path: str):
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
img = predict("./photos/2022-02-05-232238.jpg")
plt.imshow(img)
plt.show()




