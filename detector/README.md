### Running inference

First of all, be in this directory

<br/>

You'll need to scp this file 

`/vol/bitbucket/jlq19/shank/shank-detector/detector/model_weights/model_final.pth`

from Imperial lab computers into your local directory into the model_weights folder in this repo


```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 production.py
```