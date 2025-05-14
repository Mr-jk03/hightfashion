import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import StatusOrder from "./StatusOrder/StatusOrder";

function App() {
  ////"homepage": "https://mr-jk03.github.io/hightfashion/",
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/statusOrder" element={<StatusOrder />} />
      </Routes>
    </>
  );
}

export default App;
