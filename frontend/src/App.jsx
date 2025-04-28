import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Loginpage from "./pages/Loginpage";  
import Signup from "./pages/Signup";
import Landing2 from "./Pages/Landing2"
import Dashboard from "./Pages/Dashboard";
import Dashboard2 from "./Pages/Dashboard2";
import History from "./Pages/History";
import Profile from "./Pages/Profile";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login2" element={<Landing2/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard2" element={<Dashboard2/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    
  
  );
}

export default App;
