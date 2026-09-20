import cv2
from cv2 import dnn_superres
import os

def upscale_image(image_path, model_path, output_path):
    print(f"Upscaling {image_path} to {output_path}...")
    sr = dnn_superres.DnnSuperResImpl_create()
    img = cv2.imread(image_path)
    if img is None:
        print(f"Failed to load {image_path}")
        return
    
    sr.readModel(model_path)
    sr.setModel("fsrcnn", 4)
    
    result = sr.upsample(img)
    cv2.imwrite(output_path, result, [cv2.IMWRITE_JPEG_QUALITY, 95])
    print(f"Saved {output_path}")

images = [
    'lc-coupe.jpg',
    'ls-sedan.jpg',
    'lx-mountains.jpg',
    'red-lexus.jpg',
    'isf.jpg',
    'gsf.jpg',
    'gx-series.jpg',
    'rx-series.jpg',
    'nx-series.jpg',
    'bridge-lexus.jpg'
]

model_path = "FSRCNN_x4.pb"
for img_name in images:
    if os.path.exists(img_name):
        base, ext = os.path.splitext(img_name)
        output_name = f"{base}-hq{ext}"
        upscale_image(img_name, model_path, output_name)
    else:
        print(f"{img_name} not found")
