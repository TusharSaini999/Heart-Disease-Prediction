import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      staggerChildren: 0.15,
      when: "beforeChildren",
      ease: "easeOut",
      duration: 0.6,
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Health = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    exerciseFrequency: "",
    smoke: "",
    fastFoodFrequency: "",
    stressLevel: "",
    sleepHours: "",
    familyHistory: "",
    chestPain: "",
    bloodPressureOrDiabetes: "",
  });

  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = (name === "smoke" || name === "chestPain") ? value === "true" : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.age || isNaN(formData.age) || formData.age <= 0 || formData.age > 120) {
      newErrors.age = "Please enter a valid age between 1 and 120.";
    }
    if (!formData.gender) newErrors.gender = "Please select your gender.";
    if (!formData.exerciseFrequency) newErrors.exerciseFrequency = "Please select exercise frequency.";
    if (formData.smoke === "") newErrors.smoke = "Please select smoking status.";
    if (!formData.fastFoodFrequency) newErrors.fastFoodFrequency = "Please select fast food frequency.";
    if (!formData.stressLevel) newErrors.stressLevel = "Please select stress level.";
    if (!formData.sleepHours) newErrors.sleepHours = "Please select sleep hours.";
    if (!formData.familyHistory) newErrors.familyHistory = "Please select family history status.";
    if (formData.chestPain === "") newErrors.chestPain = "Please select chest pain status.";
    if (!formData.bloodPressureOrDiabetes) newErrors.bloodPressureOrDiabetes = "Please select blood pressure or diabetes status.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      setApiResponse(null);
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/predict-heart-disease`, formData);
        setApiResponse(response.data);
      } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
        setApiResponse({ error: "An error occurred, please try again." });
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Validation failed.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')`,
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-5xl w-full p-8 md:p-10 bg-white bg-opacity-90 shadow-2xl rounded-2xl">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800"
          variants={itemVariants}
        >
          ❤️ Heart Health Assessment
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              label: "What is your age?",
              type: "number",
              name: "age",
              placeholder: "Enter your age",
            },
            {
              label: "What is your gender?",
              type: "select",
              name: "gender",
              options: ["Select Gender", "Male", "Female", "Other"],
            },
            {
              label: "How often do you exercise in a week?",
              type: "select",
              name: "exerciseFrequency",
              options: ["Select Frequency", "0", "1-2", "3-5", "5+"],
              displayOptions: ["Select Frequency", "0 times", "1–2 times", "3–5 times", "More than 5 times"],
            },
            {
              label: "Do you smoke?",
              type: "select",
              name: "smoke",
              options: ["Select Option", "true", "false"],
              displayOptions: ["Select Option", "Yes", "No"],
            },
            {
              label: "How often do you eat fast food?",
              type: "select",
              name: "fastFoodFrequency",
              options: ["Select Frequency", "Rarely", "Sometimes", "Often"],
            },
            {
              label: "How would you describe your stress level?",
              type: "select",
              name: "stressLevel",
              options: ["Select Level", "Low", "Moderate", "High"],
            },
            {
              label: "How many hours of sleep do you get daily?",
              type: "select",
              name: "sleepHours",
              options: ["Select Sleep Hours", "<5", "5-7", "7-9", ">9"],
              displayOptions: ["Select Sleep Hours", "Less than 5 hours", "5–7 hours", "7–9 hours", "More than 9 hours"],
            },
            {
              label: "Family history of heart disease?",
              type: "select",
              name: "familyHistory",
              options: ["Select Option", "Yes", "No", "Not Sure"],
            },
            {
              label: "Chest pain or discomfort?",
              type: "select",
              name: "chestPain",
              options: ["Select Option", "true", "false"],
              displayOptions: ["Select Option", "Yes", "No"],
            },
            {
              label: "Blood pressure or diabetes?",
              type: "select",
              name: "bloodPressureOrDiabetes",
              options: ["Select Option", "Yes", "No", "Not Sure"],
            },
          ].map(({ label, type, name, placeholder, options, displayOptions }, i) => (
            <motion.div key={name} variants={itemVariants}>
              <label className="block font-semibold mb-1">{label}</label>
              {type === "number" ? (
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder={placeholder}
                />
              ) : (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  {options.map((opt, idx) => (
                    <option key={idx} value={opt === "Select Option" || opt === "Select Frequency" || opt === "Select Gender" || opt === "Select Level" || opt === "Select Sleep Hours" ? "" : opt}>
                      {displayOptions ? displayOptions[idx] : opt}
                    </option>
                  ))}
                </select>
              )}
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold py-3 px-6 rounded-full mt-6"
            variants={itemVariants}
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </motion.form>

        {/* Loading or Result */}
        <motion.div className="mt-8" variants={itemVariants} initial="hidden" animate={apiResponse ? "visible" : "hidden"}>
          {!loading && apiResponse && (
            <div
              className={`mt-8 p-6 border rounded-lg ${
                apiResponse.prediction?.possibleDiseases?.length === 0
                  ? "bg-green-100 border-green-400 text-green-800"
                  : "bg-orange-100 border-orange-400 text-orange-800"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">Prediction Result:</h3>

              <p className="text-lg mb-4">
                <span className="font-semibold">At Risk:</span> {apiResponse.prediction?.atRisk ? "Yes" : "No"}
              </p>

              {apiResponse.prediction?.possibleDiseases?.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Possible diseases:</p>
                  <ul className="list-disc list-inside">
                    {apiResponse.prediction.possibleDiseases.map((disease, idx) => (
                      <li key={idx}>{disease}</li>
                    ))}
                  </ul>
                </div>
              )}

              {apiResponse.error && <p className="text-red-600 font-semibold mt-4">{apiResponse.error}</p>}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Health;
