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

def predict_from_filepath(file_path: str):
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
  return output_image, len(outputs['instances']) >= 1

def predict_from_img(im):
  cfg = get_cfg()
  cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_101_FPN_3x.yaml"))
  cfg.MODEL.ROI_HEADS.NUM_CLASSES = 1
  cfg.MODEL.WEIGHTS = os.path.join("./model_weights", "model_final.pth")  # path to the model we just trained
  cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7   # set a custom testing threshold
  cfg.MODEL.DEVICE='cpu'
  predictor = DefaultPredictor(cfg)
#   im = cv2.imread(file_path)
  outputs = predictor(im)  # format is documented at https://detectron2.readthedocs.io/tutorials/models.html#model-output-format
  v = Visualizer(im[:, :, ::-1],
              #  MetadataCatalog.get("knife_train"),
                   scale=0.5)
  print(len(outputs['instances']))
  out = v.draw_instance_predictions(outputs["instances"].to("cpu"))
  output_image = out.get_image()[:, :, ::-1]
  # output_image = cv2.cvtColor(output_image, cv2.COLOR_BGR2RGB)
  # cv2.imshow('img', output_image)
  # cv2.waitKey()
  return output_image, len(outputs['instances']) >= 1


def predict_from_video(vid):
  cfg = get_cfg()
  cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_101_FPN_3x.yaml"))
  cfg.MODEL.ROI_HEADS.NUM_CLASSES = 1
  cfg.MODEL.WEIGHTS = os.path.join("./model_weights", "model_final.pth")  # path to the model we just trained
  cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7   # set a custom testing threshold
  cfg.MODEL.DEVICE='cpu'
  predictor = DefaultPredictor(cfg)
