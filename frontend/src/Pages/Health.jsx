import React, { useState } from "react";
import axios from "axios";

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
  const [loading, setLoading] = useState(false); // for loading spinner

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
        const response = await axios.post('http://localhost:4000/ai/predict-heart-disease', formData);
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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')`,
      }}
    >
      <div className="max-w-5xl w-full p-8 md:p-10 bg-white bg-opacity-90 shadow-2xl rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          ❤️ Heart Health Assessment
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AGE */}
          <div>
            <label className="block font-semibold mb-1">What is your age?</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          {/* GENDER */}
          <div>
            <label className="block font-semibold mb-1">What is your gender?</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* EXERCISE */}
          <div>
            <label className="block font-semibold mb-1">How often do you exercise in a week?</label>
            <select
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Frequency</option>
              <option value="0">0 times</option>
              <option value="1-2">1–2 times</option>
              <option value="3-5">3–5 times</option>
              <option value="5+">More than 5 times</option>
            </select>
            {errors.exerciseFrequency && <p className="text-red-500 text-sm">{errors.exerciseFrequency}</p>}
          </div>

          {/* SMOKING */}
          <div>
            <label className="block font-semibold mb-1">Do you smoke?</label>
            <select
              name="smoke"
              value={formData.smoke}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.smoke && <p className="text-red-500 text-sm">{errors.smoke}</p>}
          </div>

          {/* FAST FOOD */}
          <div>
            <label className="block font-semibold mb-1">How often do you eat fast food?</label>
            <select
              name="fastFoodFrequency"
              value={formData.fastFoodFrequency}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Frequency</option>
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
            </select>
            {errors.fastFoodFrequency && <p className="text-red-500 text-sm">{errors.fastFoodFrequency}</p>}
          </div>

          {/* STRESS */}
          <div>
            <label className="block font-semibold mb-1">How would you describe your stress level?</label>
            <select
              name="stressLevel"
              value={formData.stressLevel}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Level</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
            {errors.stressLevel && <p className="text-red-500 text-sm">{errors.stressLevel}</p>}
          </div>

          {/* SLEEP */}
          <div>
            <label className="block font-semibold mb-1">How many hours of sleep do you get daily?</label>
            <select
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Sleep Hours</option>
              <option value="<5">Less than 5 hours</option>
              <option value="5-7">5–7 hours</option>
              <option value="7-9">7–9 hours</option>
              <option value=">9">More than 9 hours</option>
            </select>
            {errors.sleepHours && <p className="text-red-500 text-sm">{errors.sleepHours}</p>}
          </div>

          {/* FAMILY HISTORY */}
          <div>
            <label className="block font-semibold mb-1">Family history of heart disease?</label>
            <select
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not Sure">Not Sure</option>
            </select>
            {errors.familyHistory && <p className="text-red-500 text-sm">{errors.familyHistory}</p>}
          </div>

          {/* CHEST PAIN */}
          <div>
            <label className="block font-semibold mb-1">Chest pain or discomfort?</label>
            <select
              name="chestPain"
              value={formData.chestPain}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.chestPain && <p className="text-red-500 text-sm">{errors.chestPain}</p>}
          </div>

          {/* BLOOD PRESSURE OR DIABETES */}
          <div>
            <label className="block font-semibold mb-1">Blood pressure or diabetes?</label>
            <select
              name="bloodPressureOrDiabetes"
              value={formData.bloodPressureOrDiabetes}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not Sure">Not Sure</option>
            </select>
            {errors.bloodPressureOrDiabetes && <p className="text-red-500 text-sm">{errors.bloodPressureOrDiabetes}</p>}
          </div>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold py-3 px-6 rounded-full mt-6"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Loading or Result */}
        <div className="mt-8">
          {!loading && apiResponse && (
            <div
              className={`mt-8 p-6 border rounded-lg ${apiResponse.prediction?.possibleDiseases?.length === 0
                  ? 'bg-green-100 border-green-400 text-green-800'
                  : 'bg-orange-100 border-orange-400 text-orange-800'
                }`}
            >
              <h3 className="text-2xl font-bold mb-4">Prediction Result:</h3>

              <p className="text-lg mb-4">
                <span className="font-semibold">At Risk:</span> {apiResponse.prediction?.atRisk}
              </p>

              {apiResponse.prediction?.possibleDiseases?.length > 0 ? (
                <div>
                  <h4 className="text-xl font-semibold mb-2">Possible Diseases:</h4>
                  <ul className="list-disc list-inside text-lg">
                    {apiResponse.prediction.possibleDiseases.map((disease, index) => (
                      <li key={index}>{disease}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-lg">No diseases predicted. 🎉</p>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Health;
