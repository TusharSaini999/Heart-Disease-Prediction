import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Landing2 from "./Pages/Landing2"
import Dashboard from "./Pages/Dashboard";
import History from "./Pages/History";
import Profile from "./Pages/Profile";
import Health from "./Pages/Health";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/landing2"
        element={
          <ProtectedRoute>
            <Landing2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/health"
        element={
          <ProtectedRoute>
            <Health />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
