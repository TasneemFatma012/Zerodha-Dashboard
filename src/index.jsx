import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import AppDetail from "./components/AppDetail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Analytics from "./components/Analytics";
import More from "./components/More";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="/apps/:id" element={<AppDetail/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/more" element={<More/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);