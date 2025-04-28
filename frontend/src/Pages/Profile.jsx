import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
Modal.setAppElement("#root");



function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [userType, setUserType] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " /*random api*/ ",
          {
            headers: { Authorization: token },
          }
        );
        setProfileData(response.data);
        setFormData(response.data);
        setUserType(response.data.userType);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err.message);
        setError("Failed to load profile data. Please try again.");
        setLoading(false);
      }
    };

    if (token) fetchData();
    else {
      setError("No token found. Please log in.");
      setLoading(false);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (!password) {
      openModal("Please enter your password to confirm changes.");
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("id", profileData.id);
      formDataObj.append("name", formData.name);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("address", formData.address);
      formDataObj.append("currentPassword", password);
      formDataObj.append("userType", userType);

      if (selectedImage) {
        formDataObj.append("image", selectedImage);
      }

      setLoading(true);
      await axios.put(
        "https://campuseats-ki1c.onrender.com/users/profile-update",
        formDataObj,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfileData((prev) => ({ ...prev, ...formData }));
      setIsEditing(false);
      setPassword("");
      openModal("Profile updated successfully!");
      setLoading(false);
    } catch (err) {
      console.error("Error saving profile data:", err.message);
      openModal("Failed to update profile. Please check your password and try again.");
      setPassword("");
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFormData((prev) => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <aside className="w-full md:w-1/4 bg-white shadow-lg flex flex-col items-center py-8 px-4">
          <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-full mb-4"></div>
          <div className="w-32 h-6 bg-gray-200 animate-pulse rounded mb-1"></div>
          <div className="w-48 h-4 bg-gray-200 animate-pulse rounded mb-6"></div>
        </aside>
        <main className="flex-1 bg-gradient-to-br from-blue-100 to-yellow-50 p-8">
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="w-32 h-6 bg-gray-200 animate-pulse rounded mb-1"></div>
              <div className="w-32 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="w-full h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-yellow-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Message"
        className="bg-white p-8 rounded-lg shadow-lg mx-auto my-16 w-1/3 text-center animate_animated animate_fadeInDown"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-semibold mb-4">Message</h2>
        <p>{modalMessage}</p>
        <button
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>

      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white shadow-lg flex flex-col items-center py-8 px-4">
        <div className="relative mb-6">
          <img
            src={formData.imagePreview || formData.image || "https://res.cloudinary.com/dsljhnanm/image/upload/v1738933770/user_profiles/nxoqa16irnfv97prhxna.jpg"}
            alt={formData.name || "User"}
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-400">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 7.5l1.5-2.5h7.5l1.5 2.5m-9 0h6m-6 0v1m0-1v-1m6 1v1m0-1v-1"
                />
              </svg>
            </label>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {formData.name || "N/A"}
        </h2>
        <p className="text-gray-500 mb-6">{formData.email || "N/A"}</p>

        {userType !== "vendor" && userType !== "delivery_boy" && (
          <Link
            to="/order-history"
            className="w-3/4 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg shadow-md"
          >
            Orders
          </Link>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-100 to-yellow-50 p-8">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Profile Details</h2>

            {isEditing ? (
              <button
                className="bg-green-500 hover:bg-green-400 text-white py-2 px-4 rounded-lg shadow-md disabled:opacity-50"
                onClick={handleSave}
                disabled={loading}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md disabled:opacity-50"
                onClick={() => setIsEditing(true)}
                disabled={loading}
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none ${!isEditing ? "bg-gray-100" : ""}`}
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                disabled
                className="w-full border rounded-md px-3 py-2 text-gray-800 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none ${!isEditing ? "bg-gray-100" : ""}`}
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none ${!isEditing ? "bg-gray-100" : ""}`}
              />
            </div>

            {isEditing && (
              <div>
                <label className="block text-gray-600 text-sm mb-1">Current Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
