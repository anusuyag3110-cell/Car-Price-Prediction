from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import joblib
import json
import pandas as pd
import time

ROOT = Path(__file__).parent
MODEL_PATH = ROOT / 'model.pkl'
META_PATH = ROOT / 'metadata.json'
DATA_PATH = ROOT / 'dataset.csv'

app = FastAPI(title='Smart Used Car Price Prediction API')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

model = None
metadata = None

def load_artifacts():
    global model, metadata
    if MODEL_PATH.exists():
        model = joblib.load(MODEL_PATH)
    if META_PATH.exists():
        with open(META_PATH, 'r') as f:
            metadata = json.load(f)


class PredictRequest(BaseModel):
    Brand: str
    Model: str
    Year: int
    Kilometers: float
    Fuel: str
    Transmission: str
    Seller_Type: str
    Owners: int
    Insurance: str
    Service_History: str
    Engine: float
    Mileage: float
    City: str


@app.on_event('startup')
def startup_event():
    load_artifacts()


@app.get('/')
def health():
    return {'status': 'ok'}


@app.get('/brands')
def get_brands():
    df = pd.read_csv(DATA_PATH)
    brands = sorted(df['Brand'].dropna().unique().tolist())
    return {'brands': brands}


@app.get('/models/{brand}')
def get_models(brand: str):
    df = pd.read_csv(DATA_PATH)
    models = sorted(df[df['Brand'].str.lower() == brand.lower()]['Model'].dropna().unique().tolist())
    return {'models': models}


@app.post('/predict')
def predict(req: PredictRequest):
    if model is None or metadata is None:
        raise HTTPException(status_code=503, detail='Model not trained. Run train_model.py first.')
    payload = pd.DataFrame([req.dict()])
    start = time.time()
    pred = model.predict(payload)[0]
    duration = time.time() - start
    # Confidence: use model r2 score from metadata (0..1)
    model_name = metadata.get('best_model')
    score = metadata.get('results', {}).get(model_name, {}).get('r2', 0)
    # price range +- 10% (simple heuristic)
    low = float(pred * 0.9)
    high = float(pred * 1.1)
    return {
        'predicted_price': float(pred),
        'confidence': float(score),
        'model_used': model_name,
        'price_range': [low, high],
        'prediction_time_seconds': round(duration, 4),
        'input': req.dict()
    }
