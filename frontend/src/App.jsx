import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Loginpage from "./pages/Loginpage";  
import Signup from "./pages/Signup";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
  
  );
}

export default App;
