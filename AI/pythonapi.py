import json
import joblib
import numpy as np
from http.server import BaseHTTPRequestHandler, HTTPServer

#create a Api for Express js
model = joblib.load("heart_disease_model.pkl")
scaler = joblib.load("scaler.pkl")

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/predict":
            
            content_length = int(self.headers["Content-Length"])
            post_data = self.rfile.read(content_length)
            
            try:
                
                input_data = json.loads(post_data)
                features = input_data.get("features", [])

                if not isinstance(features, list) or len(features) == 0:
                    self.send_response(400)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "Invalid input"}).encode())
                    return
                
                
                features_scaled = scaler.transform([features])

                
                prediction = model.predict(features_scaled)[0]

                
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                response = {"predicted_class": int(prediction)}
                self.wfile.write(json.dumps(response).encode())

            except Exception as e:
                self.send_response(500)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())


PORT = 8000
server = HTTPServer(("localhost", PORT), RequestHandler)
print(f"Server running on http://localhost:{PORT}")
server.serve_forever()
