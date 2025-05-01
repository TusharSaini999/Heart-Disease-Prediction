import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/landing2");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
  
        if (!response.ok) {
          setErrors({ general: data.error || "Login failed" });
          return;
        }
  
        // Store token in localStorage or cookie
        localStorage.setItem("token", data.token);
  
        console.log("Login successful!");
        navigate("/landing2");
      } catch (err) {
        console.error("Login error:", err);
        setErrors({ general: "Something went wrong. Try again later." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1732628348854-56a54f1da2ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 bg-opacity-90">
        <h2 className="text-2xl font-bold text-center mb-4">Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded-lg"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded-lg"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}
          {errors.general && <p className="text-red-500 text-sm mb-2">{errors.general}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Log in
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
