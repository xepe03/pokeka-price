import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PackDetail from "./PackDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pack/:id" element={<PackDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
