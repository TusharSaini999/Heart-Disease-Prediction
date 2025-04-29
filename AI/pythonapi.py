import json
import joblib
import numpy as np
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

# Load model and scaler
model = joblib.load("heart_disease_model.pkl")
scaler = joblib.load("scaler.pkl")

# API key
API_KEY = "dcxfsdfcwqwas324566rfdswed56dsa"

class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header("Content-type", "application/json")
        self.end_headers()

    def do_HEAD(self):
        self._set_headers(200)

    def do_POST(self):
        if self.path == "/predict":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)

            auth_header = self.headers.get("Authorization")
            if not auth_header or auth_header != f"Bearer {API_KEY}":
                self._set_headers(401)
                self.wfile.write(json.dumps({"error": "Unauthorized"}).encode())
                return

            try:
                input_data = json.loads(post_data)
                features = input_data.get("features", [])

                if not isinstance(features, list) or len(features) != 13:
                    self._set_headers(400)
                    self.wfile.write(json.dumps({
                        "error": "Invalid input. 'features' must be an array of 13 numeric values."
                    }).encode())
                    return

                features_scaled = scaler.transform([features])
                prediction = model.predict(features_scaled)[0]

                self._set_headers(200)
                self.wfile.write(json.dumps({
                    "predicted_class": int(prediction)
                }).encode())

            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"error": str(e)}).encode())

# Use PORT from environment for Render
PORT = int(os.environ.get("PORT", 8000))
server = HTTPServer(("0.0.0.0", PORT), RequestHandler)
print(f"Server running on http://0.0.0.0:{PORT}")
server.serve_forever()
