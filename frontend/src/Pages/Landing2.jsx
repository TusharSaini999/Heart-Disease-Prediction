import React from "react";
import { Link } from "react-router-dom";



function Landing2({ user }){
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
    
    <div className="flex items-center justify-between p-4 md:px-16 bg-gray-100 shadow">
      <div className="flex items-center space-x-2">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
          <img src="https://th.bing.com/th/id/OIP.Y2dAxeNpJoEBfex-qXl3UAHaHa?w=512&h=512&rs=1&pid=ImgDetMain" alt="Heart Logo" className="w-6 h-6" />
        </div>
      </div>
      <div className="flex space-x-8 text-gray-500 font-medium">
        <Link to="/Login2" className="text-blue-600">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/history">History</Link>
      </div>
      <button className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-full font-medium shadow">
        Logout
      </button>
    </div>

    <div className="p-8 flex flex-col md:flex-row items-center justify-center">
      <div className="max-w-xl md:w-1/2 p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          <span role="img" aria-label="wave">👋</span> Welcome, <span className="text-blue-500">{user?.name || "Guest"}</span>!
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          To begin your heart health analysis, make sure you have the following medical reports ready. They help us provide the most accurate prediction.
        </p>
        <Link to="/dashboard" className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-base px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all">
          Predict Heart Disease
        </Link>
        <br />
        <br />
        <Link to="/health" className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-base px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all">
        Check My Health
        </Link>
        
      </div>
      <div className="md:w-1/2 flex justify-center p-4">
        <img
          src="https://media.istockphoto.com/id/1285488837/photo/human-circulatory-system-heart-anatomy.jpg?s=612x612&w=0&k=20&c=Grm7TImEytF0bsRWNzfRL8iVhbRUGPB7L2txDk2HEUc="
          alt="3D Heart Illustration"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>

    <div className="bg-white py-12 px-4 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        <span role="img" aria-label="pencil">📝</span> Required <span className="text-green-600">Medical</span> Reports
      </h2>
      <p className="text-lg text-gray-400 mb-8">
        Please ensure the following reports are available before proceeding with the heart disease prediction.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Chest Pain Type",
            emoji: "❤️",
            type: "Valid Types:",
            details: ["Typical Angina", "Atypical Angina", "Non-Anginal Pain", "Asymptomatic"]
          },
          {
            title: "Resting ECG Results",
            emoji: "🧑‍⚕️",
            type: "Valid Values:",
            details: ["Normal", "ST-T wave abnormality", "Left ventricular hypertrophy"]
          },
          {
            title: "Thalassemia Test Result",
            emoji: "🧬",
            type: "Valid Values:",
            details: ["Normal", "Fixed Defect", "Reversible Defect"]
          },
          {
            title: "Resting Blood Pressure",
            emoji: "💉",
            type: "Valid Range:",
            details: ["80 - 200 mmHg"]
          },
          {
            title: "Cholesterol Level",
            emoji: "💪",
            type: "Valid Range:",
            details: ["100 - 500 mg/dL"]
          },
          {
            title: "ST Depression",
            emoji: "📉",
            type: "Valid Range:",
            details: ["0.0 - 6.0 mm"]
          },
          {
            title: "Fasting Blood Sugar",
            emoji: "🧠",
            type: "Valid Values:",
            details: ["Normal", "High"]
          },
          {
            title: "Exercise-Induced Angina",
            emoji: "🏃‍♂️",
            type: "Valid Values:",
            details: ["No", "Yes"]
          },
          {
            title: "Slope of ST Segment",
            emoji: "⛰️",
            type: "Valid Values:",
            details: ["Upsloping", "Flat", "Downsloping"]
          },
          {
            title: "Maximum Heart Rate Achieved",
            emoji: "❤️",
            type: "Valid Range:",
            details: ["60 - 220 bpm"]
          },
          {
            title: "Number of Major Blood Vessels",
            emoji: "🩸",
            type: "Valid Range:",
            details: ["0 - 3"]
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded-xl shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              <span className="mr-1">{item.emoji}</span> {item.title}
            </h3>
            <p className="text-sm text-gray-600 font-medium mb-1">{item.type}</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {item.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default Landing2;
