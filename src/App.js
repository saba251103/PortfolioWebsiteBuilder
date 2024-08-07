import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import './App.css';
import DenseAppBar from './menu';
import ResumeUpload from './ResumeUpload';
import Personaldetails from './personal';
import Education from './education';
import Experience from './experience';
import Skills from './key';
import Design1 from './design1'; // Assuming design1 is a component and renamed to Design1

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ResumeUpload" element={<ResumeUpload />} />
        <Route path="/personal" element={<Personaldetails />} />
        <Route path="/education" element={<Education />} />
        <Route path="/Experience" element={<Experience />} />
        <Route path="/key" element={<Skills />} />
        <Route path="/design1" element={<Design1 />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
