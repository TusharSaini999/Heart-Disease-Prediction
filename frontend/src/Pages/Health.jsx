import React, { useState } from "react";

const Health = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    exerciseFrequency: "",
    smoker: "",
    fastFoodFrequency: "",
    stressLevel: "",
    sleepHours: "",
    familyHistory: "",
    chestPain: "",
    highBloodPressureOrDiabetes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
    if (!formData.smoker) newErrors.smoker = "Please select smoking status.";
    if (!formData.fastFoodFrequency) newErrors.fastFoodFrequency = "Please select fast food frequency.";
    if (!formData.stressLevel) newErrors.stressLevel = "Please select stress level.";
    if (!formData.sleepHours) newErrors.sleepHours = "Please select sleep hours.";
    if (!formData.familyHistory) newErrors.familyHistory = "Please select family history status.";
    if (!formData.chestPain) newErrors.chestPain = "Please select chest pain status.";
    if (!formData.highBloodPressureOrDiabetes) newErrors.highBloodPressureOrDiabetes = "Please select blood pressure or diabetes status.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Submitted:", formData);
      // send formData to backend
    } else {
      console.log("Validation failed.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')`,
      }}
    >
      <div className="max-w-5xl w-full p-10 bg-white bg-opacity-90 shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          ❤️ Heart Health Assessment
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
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

      
          <div>
            <label className="block font-semibold mb-1">How often do you exercise in a week?</label>
            <select
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Frequency</option>
              <option value="0 times">0 times</option>
              <option value="1–2 times">1–2 times</option>
              <option value="3–5 times">3–5 times</option>
              <option value="More than 5 times">More than 5 times</option>
            </select>
            {errors.exerciseFrequency && <p className="text-red-500 text-sm">{errors.exerciseFrequency}</p>}
          </div>

       
          <div>
            <label className="block font-semibold mb-1">Do you smoke?</label>
            <select
              name="smoker"
              value={formData.smoker}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.smoker && <p className="text-red-500 text-sm">{errors.smoker}</p>}
          </div>

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

  
          <div>
            <label className="block font-semibold mb-1">How many hours of sleep do you get daily?</label>
            <select
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Sleep Hours</option>
              <option value="Less than 5 hours">Less than 5 hours</option>
              <option value="5–7 hours">5–7 hours</option>
              <option value="7–9 hours">7–9 hours</option>
              <option value="More than 9 hours">More than 9 hours</option>
            </select>
            {errors.sleepHours && <p className="text-red-500 text-sm">{errors.sleepHours}</p>}
          </div>

       
          <div>
            <label className="block font-semibold mb-1">Do you have a family history of heart disease?</label>
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

          <div>
            <label className="block font-semibold mb-1">Do you often experience chest pain or discomfort?</label>
            <select
              name="chestPain"
              value={formData.chestPain}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.chestPain && <p className="text-red-500 text-sm">{errors.chestPain}</p>}
          </div>

      
          <div>
            <label className="block font-semibold mb-1">Do you have high blood pressure or diabetes?</label>
            <select
              name="highBloodPressureOrDiabetes"
              value={formData.highBloodPressureOrDiabetes}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Not Sure">Not Sure</option>
            </select>
            {errors.highBloodPressureOrDiabetes && <p className="text-red-500 text-sm">{errors.highBloodPressureOrDiabetes}</p>}
          </div>

       
          <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Health;
