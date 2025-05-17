import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeartModel from "../components/heart";

const reportItems = [
  {
    title: "Chest Pain Type",
    emoji: "❤️",
    type: "Valid Types:",
    details: ["Typical Angina", "Atypical Angina", "Non-Anginal Pain", "Asymptomatic"],
  },
  {
    title: "Resting ECG Results",
    emoji: "🧑‍⚕️",
    type: "Valid Values:",
    details: ["Normal", "ST-T wave abnormality", "Left ventricular hypertrophy"],
  },
  {
    title: "Thalassemia Test Result",
    emoji: "🧬",
    type: "Valid Values:",
    details: ["Normal", "Fixed Defect", "Reversible Defect"],
  },
  {
    title: "Resting Blood Pressure",
    emoji: "💉",
    type: "Valid Range:",
    details: ["80 - 200 mmHg"],
  },
  {
    title: "Cholesterol Level",
    emoji: "💪",
    type: "Valid Range:",
    details: ["100 - 500 mg/dL"],
  },
  {
    title: "ST Depression",
    emoji: "📉",
    type: "Valid Range:",
    details: ["0.0 - 6.0 mm"],
  },
  {
    title: "Fasting Blood Sugar",
    emoji: "🧠",
    type: "Valid Values:",
    details: ["Normal", "High"],
  },
  {
    title: "Exercise-Induced Angina",
    emoji: "🏃‍♂️",
    type: "Valid Values:",
    details: ["No", "Yes"],
  },
  {
    title: "Slope of ST Segment",
    emoji: "⛰️",
    type: "Valid Values:",
    details: ["Upsloping", "Flat", "Downsloping"],
  },
  {
    title: "Maximum Heart Rate Achieved",
    emoji: "❤️",
    type: "Valid Range:",
    details: ["60 - 220 bpm"],
  },
  {
    title: "Number of Major Blood Vessels",
    emoji: "🩸",
    type: "Valid Range:",
    details: ["0 - 3"],
  },
];

const Landing2 = () => {
  const name = localStorage.getItem("name");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Welcome Section */}
      <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-center">
        <div className="max-w-xl md:w-1/2 p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            👋 Welcome, <span className="text-blue-500">{name || "Guest"}</span>!
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            To begin your heart health analysis, make sure you have the following medical reports ready.
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all"
            >
              Predict Heart Disease
            </Link>
            <Link
              to="/health"
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all"
            >
              Check My Heart
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center p-4 mt-6 md:mt-0">
          <HeartModel />
        </div>
      </div>

      {/* Report Section */}
      <div className="bg-white py-12 px-4 md:px-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          📝 Required <span className="text-green-600">Medical</span> Reports
        </h2>
        <p className="text-lg text-gray-400 mb-10">
          Ensure the following health details are provided before proceeding with the 'Predict Heart Disease' prediction.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl shadow border border-gray-100 hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                <span className="mr-1">{item.emoji}</span> {item.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium mb-1">{item.type}</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {item.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Landing2;
