import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Authentication />} />
      </Routes>
    </>
  );
}

export default App;
