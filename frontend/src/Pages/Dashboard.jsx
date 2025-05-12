// Enhanced React Form with Responsiveness, UI Improvements, and Animations

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeartDiseaseForm() {
  const [formData, setFormData] = useState({
    age: '', sex: '', cp: '', trestbps: '', chol: '', fbs: '', restecg: '',
    thalach: '', exang: '', oldpeak: '', slope: '', ca: '', thal: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    const featuresArray = Object.values(parsedData);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-cover bg-center p-4 md:p-8"
      style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7_gEjLSEKrA2n9Mt58ZjQF_xT-Fz5yi7FA&s")' }}
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto backdrop-blur-md bg-white/80 p-6 sm:p-10 rounded-2xl shadow-2xl"
      >
        <h2 className="col-span-1 sm:col-span-2 text-3xl font-bold text-center text-indigo-700">💓 Heart Disease Risk Form</h2>

        {Object.entries({
          age: '🎂 Age (20-90)',
          sex: '⚧ Sex',
          cp: '❤️ Chest Pain Type',
          trestbps: '💉 Resting BP (80-200)',
          chol: '🧪 Cholesterol (100-500)',
          fbs: '🩸 Fasting Blood Sugar',
          restecg: '📈 Resting ECG',
          thalach: '🏃 Max Heart Rate (60-220)',
          exang: '💪 Exercise-Induced Angina',
          oldpeak: '📉 ST Depression (0.0 - 6.0)',
          slope: '📊 Slope of ST Segment',
          ca: '🫀 Major Vessels (0-3)',
          thal: '🧬 Thalassemia Result',
        }).map(([name, label]) => (
          <motion.div
            key={name}
            className="flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <label className="font-semibold mb-1">{label}</label>
            {name === 'sex' || name === 'cp' || name === 'fbs' || name === 'restecg' || name === 'exang' || name === 'slope' || name === 'thal' ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              >
                {/* Add appropriate options here based on field */}
                {name === 'sex' && <>
                  <option value="">Select</option>
                  <option value="0">♀️ Female</option>
                  <option value="1">♂️ Male</option>
                </>}
                {name === 'cp' && <>
                  <option value="">Select</option>
                  <option value="0">💥 Typical Angina</option>
                  <option value="1">🔥 Atypical Angina</option>
                  <option value="2">😣 Non-Anginal Pain</option>
                  <option value="3">😐 Asymptomatic</option>
                </>}
                {name === 'fbs' && <>
                  <option value="">Select</option>
                  <option value="0">🟢 Normal</option>
                  <option value="1">🔴 High</option>
                </>}
                {name === 'restecg' && <>
                  <option value="">Select</option>
                  <option value="0">✅ Normal</option>
                  <option value="1">⚠️ ST-T Abnormal</option>
                  <option value="2">🧠 LV Hypertrophy</option>
                </>}
                {name === 'exang' && <>
                  <option value="">Select</option>
                  <option value="0">❌ No</option>
                  <option value="1">✔️ Yes</option>
                </>}
                {name === 'slope' && <>
                  <option value="">Select</option>
                  <option value="0">↗️ Upsloping</option>
                  <option value="1">➡️ Flat</option>
                  <option value="2">↘️ Downsloping</option>
                </>}
                {name === 'thal' && <>
                  <option value="">Select</option>
                  <option value="1">✅ Normal</option>
                  <option value="2">🛑 Fixed Defect</option>
                  <option value="3">🔄 Reversible Defect</option>
                </>}
              </select>
            ) : (
              <input
                type={name === 'oldpeak' ? 'number' : 'number'}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
            )}
          </motion.div>
        ))}

        <div className="col-span-1 sm:col-span-2 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
          >
            🚀 Submit
          </motion.button>
        </div>

        {loading && (
          <div className="col-span-2 text-center mt-4 text-blue-700 font-semibold animate-pulse">
            🔄 Predicting, please wait...
          </div>
        )}

        {prediction !== null && (
          <motion.div
            className="col-span-2 mt-4 text-center bg-green-100 text-green-800 px-4 py-3 rounded shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✅ Predicted Heart Disease Type: <strong>{heartDiseaseTypes[prediction]}</strong>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="col-span-2 mt-4 text-center bg-red-100 text-red-800 px-4 py-3 rounded shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ❌ {error}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}