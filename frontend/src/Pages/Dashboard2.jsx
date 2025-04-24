import React, { useState } from "react";

const Dashboard2 = () => {
  const [formData, setFormData] = useState({
    ecgResults: "",
    exerciseAngina: "",
    stDepression: "",
    stSlope: "",
    majorVessels: "",
    thalassemia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Handle result generation logic here
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1441193911/vector/3d-red-heart-with-pulse-line-with-magnifier-and-plus-icon-heartbeat-or-cardiogram-pulse-beat.jpg?s=612x612&w=0&k=20&c=9WTrkE8zkrV8c2QuhSH1rvkOzjxo0ndKCcJfwV24uik=')", // Replace with your actual image path
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl bg-white bg-opacity-90 rounded-xl p-8">
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            <span className="text-red-600">❤️ Heart</span> Disease Prediction
          </h1>
          <p className="text-gray-600 text-lg font-semibold">
            Your test report is almost ready! Please ensure all your information is accurate,
            and proceed to the next step to receive your heart disease prediction. It helps us
            provide the most accurate results based on your health data.
          </p>
          <div className="bg-white shadow p-4 rounded">
            <ul className="space-y-2">
              <li>Resting ECG Results</li>
              <li>Exercise-Induced Angina</li>
              <li>ST Depression</li>
              <li>Slope of ST Segment</li>
              <li>Number of Major Blood Vessels</li>
              <li>Thalassemia Test Result</li>
            </ul>
          </div>
        </div>

        {/* Right Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded-xl p-8 space-y-4 shadow"
        >
          {Object.entries(formData).map(([key, value]) => (
            <input
              key={key}
              type="text"
              name={key}
              value={value}
              placeholder={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
              required
            />
          ))}

          <div className="pt-4 text-right">
            <button
              type="submit"
              className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-500"
            >
              Test
            </button>
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              className="w-full px-6 py-2 rounded-full text-2xl bg-gray-300"
            >
              Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard2;
