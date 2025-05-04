import { Routes, Route, useLocation } from "react-router-dom";
import Landingpage from "./Pages/Landingpage";
import Loginpage from "./Pages/Loginpage";  
import Signup from "./Pages/Signup";
import Landing2 from "./Pages/Landing2";
import Dashboard from "./Pages/Dashboard";
import History from "./Pages/History";
import Profile from "./Pages/Profile";
import Health from "./Pages/Health";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  // Define the routes where you don't want to show the navbar
  const hideNavbarPaths = ["/login", "/signup"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing2" element={<ProtectedRoute><Landing2 /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/health" element={<ProtectedRoute><Health /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
