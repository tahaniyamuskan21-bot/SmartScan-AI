
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from PIL import Image
import io
import torch
from transformers import CLIPModel, CLIPProcessor

# ==========================================
# 1. FLASK SETUP
# ==========================================

app = Flask(__name__)
CORS(app)

# ==========================================
# 2. YOLO11s MODEL
# ==========================================

print("Loading YOLO11s model...")

yolo_model = YOLO("yolo11s.pt")

print("YOLO11s loaded successfully!")

# ==========================================
# 3. CLIP MODEL
# ==========================================

CLIP_MODEL_NAME = "openai/clip-vit-base-patch32"

print("Loading CLIP model...")

clip_model = CLIPModel.from_pretrained(CLIP_MODEL_NAME)
clip_processor = CLIPProcessor.from_pretrained(CLIP_MODEL_NAME)

clip_model.eval()

print("CLIP model loaded successfully!")

# ==========================================
# 4. OBJECT LABELS
# ==========================================

object_labels = [
    "cell phone", "laptop", "book", "bottle", "cup",
    "scissors", "backpack", "watch", "pen", "pencil",
    "charger", "paper", "car", "person",
    "sandy soil", "clay soil", "silt soil", "loamy soil",
    "peaty soil", "chalky soil",
    "apple", "banana", "mango", "orange", "dragon fruit",
    "star fruit", "strawberry", "blueberry",
    "carrot", "tomato", "potato", "eggplant", "beetroot",
    "onion", "chocolate", "key", "wallet", "umbrella",
    "shoe", "toothbrush", "vase", "baseball bat", "bed",
    "chair", "table", "keyboard", "mouse", "headphones",
    "television", "remote control", "camera", "flower", "plant",
    "water glass", "plate", "fork", "spoon", "bag", "helmet",
    "sunglasses", "toy", "soap", "notebook", "fruit", "vegetable"
]

# ==========================================
# 5. CLIP RECOGNITION FUNCTION
# ==========================================

def recognize_with_clip(image):

    descriptions = [
        f"a photo of a {label}"
        for label in object_labels
    ]

    inputs = clip_processor(
        text=descriptions,
        images=image,
        return_tensors="pt",
        padding=True
    )

    with torch.inference_mode():
        outputs = clip_model(**inputs)
        scores = outputs.logits_per_image.softmax(dim=1)[0]

    best_index = int(scores.argmax())

    return {
        "name": object_labels[best_index],
        "confidence": round(float(scores[best_index]) * 100, 2),
        "method": "CLIP"
    }

# ==========================================
# 6. PREDICTION API
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({
            "error": "No image received"
        }), 400

    try:

        image_file = request.files["image"]

        image = Image.open(
            io.BytesIO(image_file.read())
        ).convert("RGB")

        # Run YOLO11s
        print("Running YOLO11s...")

        yolo_results = yolo_model(
            image,
            conf=0.40,
            verbose=False
        )

        yolo_detections = []

        for result in yolo_results:
            for box in result.boxes:

                class_id = int(box.cls[0])
                confidence = float(box.conf[0]) * 100

                yolo_detections.append({
                    "name": yolo_model.names[class_id],
                    "confidence": round(confidence, 2),
                    "method": "YOLO11s"
                })

        # Run CLIP on every image
        print("Running CLIP recognition...")

        clip_result = recognize_with_clip(image)

        # CLIP result is returned to frontend
        detections = [clip_result]

        print("Recognition result:", clip_result["name"])

        return jsonify({
            "detections": detections,
            "yolo_detections": yolo_detections
        })

    except Exception as error:

        print("Prediction error:", error)

        return jsonify({
            "error": str(error)
        }), 500

# ==========================================
# 7. START FLASK SERVER
# ==========================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )
