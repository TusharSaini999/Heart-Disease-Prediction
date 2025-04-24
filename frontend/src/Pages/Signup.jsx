import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "gender") {
      value = value === "Male" ? "1" : value === "Female" ? "0" : value;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1705734975305-63e6a597432a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 bg-opacity-90">
        <h2 className="text-2xl font-bold text-center mb-4">Create an account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded-lg"
            required
          />
        
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full mb-4 px-3 py-2 border rounded-lg"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
