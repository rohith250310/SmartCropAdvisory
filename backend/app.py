from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load("crop_model.pkl")
encoder = joblib.load("label_encoder.pkl")


class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float


@app.get("/")
def home():
    return {"message": "Crop Recommendation API Running"}


@app.post("/recommend_crop")
def recommend_crop(data: CropInput):

    sample = pd.DataFrame([{
        "N": data.N,
        "P": data.P,
        "K": data.K,
        "temperature": data.temperature,
        "humidity": data.humidity,
        "ph": data.ph,
        "rainfall": data.rainfall,
        "soil_fertility": (data.N + data.P + data.K) / 3,
        "N_P_ratio": data.N / (data.P + 1),
        "N_K_ratio": data.N / (data.K + 1),
        "drought_index": data.rainfall / (data.temperature + 1),
        "soil_acidity": abs(data.ph - 7)
    }])

    prediction = model.predict(sample)
    crop = encoder.inverse_transform(prediction)[0]

    return {"recommended_crop": crop}