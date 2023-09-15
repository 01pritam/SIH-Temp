import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login"; // Import your Login component here
import Home from "./components/home/Home";
import Projects from "./components/projects/Projects";

function App() {
  const [loginUser, setLoginUser] = useState(null);

  return (
    <Router>
      {/* Define your routes within the Router */}
      <Routes>
        {/* Define your routes using Route components */}
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />

        <Route path="/" element={<Home setLoginUser={setLoginUser} />} />

        <Route path="/projects" element={<Projects/>} />

        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;