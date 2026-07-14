# Project Title

Smart Used Car Price Prediction

## Project Description

This project trains machine learning models to predict used car prices and exposes a FastAPI service consumed by a Vite + React frontend.

## Features

- Train and compare multiple regression models
- Preprocessing pipeline for categorical and numeric features
- REST API for predictions and metadata
- Interactive frontend to request price estimates

## Screenshots

_Add screenshots to `frontend/public/screenshots/` and reference them here._

## Demo

- Run backend and frontend locally, open the frontend URL (usually `http://localhost:5173`) and request predictions via the UI. API docs: `http://127.0.0.1:8000/docs`.

## Tech Stack

- Backend: Python, FastAPI, scikit-learn, pandas, joblib
- Frontend: React, Vite, Axios

## Project Structure

```
Smart_Used_Car_Price_Prediction/
	backend/
		app.py
		train_model.py
		dataset.csv
		model.pkl
		metadata.json
		requirements.txt
	frontend/
		src/
		package.json
	README.md
```

## Installation

Backend (Windows PowerShell example):

```bash
cd Smart_Used_Car_Price_Prediction/backend
python -m venv ../../.venv
../../.venv/Scripts/activate
pip install -r requirements.txt
```

Frontend:

```bash
cd Smart_Used_Car_Price_Prediction/frontend
npm install
```

## Usage

1. (Optional) Train model:

```bash
cd Smart_Used_Car_Price_Prediction/backend
../../.venv/Scripts/python.exe train_model.py
```

2. Start backend API:

```bash
cd Smart_Used_Car_Price_Prediction/backend
../../.venv/Scripts/python.exe -m uvicorn app:app --host 0.0.0.0 --port 8000
```

3. Start frontend dev server:

```bash
cd Smart_Used_Car_Price_Prediction/frontend
npm run dev
```

## Dataset

The dataset is `backend/dataset.csv`. It must include all features used by `train_model.py` and a `Target` column with prices.

## ML Workflow

1. Load CSV data
2. Train/test split (80/20)
3. Preprocess: `OneHotEncoder` for categorical columns, `StandardScaler` for numeric columns via `ColumnTransformer`
4. Build a `Pipeline` combining preprocessing and estimator
5. Train multiple estimators and evaluate on test set using RMSE and R2
6. Save best pipeline to `backend/model.pkl` and metrics to `backend/metadata.json`

## Algorithms

- Linear Regression
- Decision Tree Regressor
- Random Forest Regressor

## Model Performance

See `backend/metadata.json` for the latest training run. Example from current run:

- Best model: LinearRegression
- LinearRegression — RMSE: 1,168,717.84, R2: 0.6617
- DecisionTree — RMSE: 1,213,122.69, R2: 0.6355
- RandomForest — RMSE: 1,349,717.61, R2: 0.5488

## API Endpoints

- `GET /` — health check
- `GET /brands` — list of brands from dataset
- `GET /models/{brand}` — models for a brand
- `POST /predict` — predict price (JSON payload)

Example `POST /predict` payload:

```json
{
	"Brand":"Toyota",
	"Model":"Corolla",
	"Year":2018,
	"Kilometers":35000,
	"Fuel":"Petrol",
	"Transmission":"Manual",
	"Seller_Type":"Dealer",
	"Owners":1,
	"Insurance":"Yes",
	"Service_History":"Full",
	"Engine":1.8,
	"Mileage":18.5,
	"City":"Mumbai"
}
```

## Future Enhancements

- Improve feature engineering and missing-value handling
- Add hyperparameter tuning and cross-validation
- Calibrate model outputs and fix signed/scale issues
- CI to retrain and validate on new data

## Deployment

- Build frontend: `npm run build` and serve static files
- Containerize backend with Docker and run with an ASGI server behind a reverse proxy



