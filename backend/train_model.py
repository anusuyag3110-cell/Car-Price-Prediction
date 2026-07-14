"""Train ML models and save the best pipeline to model.pkl and metadata.json
"""
import json
import time
from pathlib import Path
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

ROOT = Path(__file__).parent
DATA = ROOT / 'dataset.csv'
OUT_MODEL = ROOT / 'model.pkl'
META = ROOT / 'metadata.json'

def load_data():
    df = pd.read_csv(DATA)
    return df


def build_pipeline(model):
    cat_cols = ['Brand','Model','Fuel','Transmission','Seller_Type','Insurance','Service_History','City']
    num_cols = ['Year','Kilometers','Owners','Engine','Mileage']
    preproc = ColumnTransformer([
        ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols),
        ('num', StandardScaler(), num_cols)
    ])
    pipeline = Pipeline([
        ('pre', preproc),
        ('est', model)
    ])
    return pipeline


def train():
    df = load_data()
    X = df.drop(columns=['Target'])
    y = df['Target']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    models = {
        'LinearRegression': LinearRegression(),
        'DecisionTree': DecisionTreeRegressor(random_state=42),
        'RandomForest': RandomForestRegressor(n_estimators=200, random_state=42)
    }

    results = {}
    best_score = -1e9
    best_name = None
    best_pipeline = None

    for name, m in models.items():
        print('Training', name)
        pipe = build_pipeline(m)
        t0 = time.time()
        pipe.fit(X_train, y_train)
        t1 = time.time()
        preds = pipe.predict(X_test)
        rmse = mean_squared_error(y_test, preds)
        rmse = float(np.sqrt(rmse))
        r2 = r2_score(y_test, preds)
        results[name] = {'rmse': float(rmse), 'r2': float(r2), 'time': t1-t0}
        print(name, 'RMSE', rmse, 'R2', r2)
        if r2 > best_score:
            best_score = r2
            best_name = name
            best_pipeline = pipe

    print('Best model:', best_name)
    joblib.dump(best_pipeline, OUT_MODEL)
    meta = {'best_model': best_name, 'results': results}
    with open(META, 'w') as f:
        json.dump(meta, f, indent=2)
    print('Saved model to', OUT_MODEL)


if __name__ == '__main__':
    train()
