

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function HeartDiseaseForm() {
  const [formData, setFormData] = useState({
    age: '', sex: '', cp: '', trestbps: '', chol: '', fbs: '', restecg: '',
    thalach: '', exang: '', oldpeak: '', slope: '', ca: '', thal: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch user info (age and gender) on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/user-info`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            age: data.age,
            sex: data.gender,
          }));
        } else {
          setError('Failed to fetch user info.');
        }
      } catch (err) {
        setError('A network error occurred while fetching user info.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError(null);
  
    const parsedData = {
      age: Number(formData.age),
      sex: Number(formData.sex),
      cp: Number(formData.cp),
      trestbps: Number(formData.trestbps),
      chol: Number(formData.chol),
      fbs: Number(formData.fbs),
      restecg: Number(formData.restecg),
      thalach: Number(formData.thalach),
      exang: Number(formData.exang),
      oldpeak: parseFloat(formData.oldpeak),
      slope: Number(formData.slope),
      ca: Number(formData.ca),
      thal: Number(formData.thal),
    };
  
    const token = localStorage.getItem("token");
    const featuresArray = Object.values(parsedData).slice(0, 13); // Exclude target_multi
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ features: featuresArray })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setPrediction(data.predicted_class);
      } else {
        setError(data.error || 'Prediction failed.');
      }
    } catch (err) {
      setError('A network error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  const heartDiseaseTypes = {
    0: "No heart disease",
    1: "Coronary Artery Disease",
    2: "Heart Failure",
    3: "Arrhythmia",
    4: "Valvular Heart Disease"
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7_gEjLSEKrA2n9Mt58ZjQF_xT-Fz5yi7FA&s")' }}>
      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-6 max-w-6xl mx-auto backdrop-blur-sm bg-white/80 rounded-xl mt-10 shadow-2xl">
        <h2 className="col-span-2 text-3xl font-bold text-center mb-4">💓 Heart Disease Risk Form</h2>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">🎂 Age (20-90)</label>
          <input type="number" name="age" min="20" max="90" value={formData.age} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">⚧ Sex</label>
          <select name="sex" value={formData.sex} onChange={handleChange} className="border rounded px-3 py-2" required>
            <option value="">Select</option>
            <option value="0">♀️ Female</option>
            <option value="1">♂️ Male</option>
          </select>
        </div>

        
        <div className="flex flex-col">
          <label className="font-semibold mb-1">❤️ Chest Pain Type</label>
          <select name="cp" value={formData.cp} onChange={handleChange} className="border rounded px-3 py-2" required>
            <option value="">Select</option>
            <option value="0">💥 Typical Angina</option>
            <option value="1">🔥 Atypical Angina</option>
            <option value="2">😣 Non-Anginal Pain</option>
            <option value="3">😐 Asymptomatic</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">💉 Resting BP (80-200)</label>
          <input type="number" name="trestbps" min="80" max="200" value={formData.trestbps} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">🧪 Cholesterol (100-500)</label>
          <input type="number" name="chol" min="100" max="500" value={formData.chol} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">🩸 Fasting Blood Sugar</label>
          <select name="fbs" value={formData.fbs} onChange={handleChange} className="border rounded px-3 py-2" required>
            <option value="">Select</option>
            <option value="0">🟢 Normal</option>
            <option value="1">🔴 High</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">📈 Resting ECG</label>
          <select name="restecg" value={formData.restecg} onChange={handleChange} className="border rounded px-3 py-2" required>
            <option value="">Select</option>
            <option value="0">✅ Normal</option>
            <option value="1">⚠️ ST-T Abnormal</option>
            <option value="2">🧠 LV Hypertrophy</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">🏃 Max Heart Rate (60-220)</label>
          <input type="number" name="thalach" min="60" max="220" value={formData.thalach} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">💪 Exercise-Induced Angina</label>
          <select name="exang" value={formData.exang} onChange={handleChange} className="border rounded px-3 py-2" required>
            <option value="">Select</option>
            <option value="0">❌ No</option>
            <option value="1">✔️ Yes</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">📉 ST Depression (0.0 - 6.0)</label>
          <input type="number" name="oldpeak" min="0" max="6" step="0.1" value={formData.oldpeak} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">📊 Slope of ST Segment</label>
          <select name="slope" value={formData.slope} onChange={handleChange} className="border rounded px-3 py-2" required>
            <option value="">Select</option>
            <option value="0">↗️ Upsloping</option>
            <option value="1">➡️ Flat</option>
            <option value="2">↘️ Downsloping</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">🫀 Major Vessels (0-3)</label>
          <input type="number" name="ca" min="0" max="3" value={formData.ca} onChange={handleChange} className="border rounded px-3 py-2" required />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">🧬 Thalassemia Result</label>
          <select name="thal" value={formData.thal} onChange={handleChange} className="border rounded px-3 py-2" required>
            <option value="">Select</option>
            <option value="1">✅ Normal</option>
            <option value="2">🛑 Fixed Defect</option>
            <option value="3">🔄 Reversible Defect</option>
          </select>
        </div>


        <div className="col-span-2 text-center">
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 shadow-lg">
            🚀 Submit
          </button>
        </div>
      </form>

      {loading && (
        <div className="col-span-2 text-center mt-4 text-blue-700 font-semibold">
          🔄 Predicting, please wait...
        </div>
      )}

      {prediction !== null && (
        <div className="col-span-2 mt-4 text-center bg-green-100 text-green-800 px-4 py-3 rounded shadow">
          ✅ Predicted Heart Disease Type: <strong>{heartDiseaseTypes[prediction]}</strong>
        </div>
      )}

      {error && (
        <div className="col-span-2 mt-4 text-center bg-red-100 text-red-800 px-4 py-3 rounded shadow">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
