import requests
import sys

BASE_URL = "http://127.0.0.1:5000"

def test_pest():
    from PIL import Image
    import numpy as np
    
    img = Image.fromarray(np.zeros((224, 224, 3), dtype=np.uint8))
    img.save("dummy_pest.jpg")
    
    with open("dummy_pest.jpg", "rb") as f:
        r = requests.post(f"{BASE_URL}/pest-detection", files={"image": f})
        print("Pest Detection:", r.status_code, r.text)

if __name__ == "__main__":
    test_pest()
