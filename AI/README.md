
# 🫀 Heart Disease Prediction API

This project provides a machine learning-powered REST API to predict heart disease based on patient health features. The API uses a trained `RandomForestClassifier` model and is built with Python's built-in `http.server` module.

---

## 📦 Features

- Trains a Random Forest model using a heart disease dataset
- Preprocesses data (duplicates removal, standardization)
- Exposes a RESTful API for predictions
- Supports API key authentication
- Easy to deploy (Render-ready)

---

## 📁 Dataset

The model is trained on `heart.csv`, which must include a `target_multi` column (multiclass target) and 13 numeric features.

---

## 🧠 Model Training

### Training Script (`train_model.py`)
```python
# Load dataset
df = pd.read_csv("heart.csv")

# Preprocess and train model
...
```

- Removes duplicate rows
- Splits data into train/test sets
- Standardizes features with `StandardScaler`
- Trains a `RandomForestClassifier`
- Saves the model and scaler using `joblib`

---

## 🚀 Running the API Server

### Requirements

- Python 3.x
- Required libraries:
  ```bash
  pip install -r req.txt
  ```

### Start Server
```bash
python pythonapi.py
```
Or on Render:
- Make sure `PORT` is read from environment.

### Endpoint

#### `POST /predict`

**Headers:**
```
Authorization: Bearer TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "features": [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1]
}
```

**Response:**
```json
{
  "predicted_class": 2
}
```

---

## 🔐 Authentication

- The API requires an API key for access:
```
Authorization: Bearer TOKEN
```

---

## 🗂 File Structure

```
.
├── heart.csv                   # Dataset file
├── model.py             # Model training script
├── pythonapi.py                  # API server script
├── heart_disease_model.pkl    # Saved trained model
├── scaler.pkl                 # Saved scaler object
└── README.md                  # Project README
```

---

