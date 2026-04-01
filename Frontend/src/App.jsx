import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"; 
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Pehla page Dashboard dikhega */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;