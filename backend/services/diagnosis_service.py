from PIL import Image
import random

def analyze_plant_image(image: Image.Image):
    """
    Simulated AI model (replace later if needed)
    """
    conditions = [
        {
            "issue": "Healthy",
            "confidence": round(random.uniform(0.8, 0.95), 2),
            "explanation": "No visible signs of disease or deficiency.",
            "treatment": "Continue regular care."
        },
        {
            "issue": "Nitrogen Deficiency",
            "confidence": round(random.uniform(0.7, 0.9), 2),
            "explanation": "Yellowing of leaves suggests nitrogen deficiency.",
            "treatment": "Add nitrogen-rich fertilizer or compost."
        },
        {
            "issue": "Overwatering",
            "confidence": round(random.uniform(0.7, 0.9), 2),
            "explanation": "Wilting and soft leaves indicate excess water.",
            "treatment": "Reduce watering frequency and improve drainage."
        },
        {
            "issue": "Fungal Infection",
            "confidence": round(random.uniform(0.6, 0.85), 2),
            "explanation": "Leaf spots indicate possible fungal infection.",
            "treatment": "Apply neem oil or antifungal treatment."
        }
    ]
    return random.choice(conditions)