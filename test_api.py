import requests
import sys

BASE_URL = "http://127.0.0.1:5000"

def test_soil():
    payload = {
        "N": 100, "P": 40, "K": 20, "pH": 6.5, "EC": 0.5, "OC": 0.8,
        "S": 10, "Zn": 2, "Fe": 5, "Cu": 1, "Mn": 4, "B": 0.5
    }
    r = requests.post(f"{BASE_URL}/soil-analysis", json=payload)
    print("Soil Analysis:", r.status_code, r.text)

def test_weather():
    payload = {"data": [25.0, 60.0, 1010.0]}
    r = requests.post(f"{BASE_URL}/weather-prediction", json=payload)
    print("Weather Prediction:", r.status_code, r.text)

def test_crop():
    payload = {"soil_color": "Black", "city": "London"}
    r = requests.post(f"{BASE_URL}/predict-crop", json=payload)
    print("Predict Crop:", r.status_code, r.text)

if __name__ == "__main__":
    test_soil()
    test_weather()
    test_crop()
