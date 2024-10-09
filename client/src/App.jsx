import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import "./App.css";
import Footer from "./components/Footer";
import { loadUser } from "./features/auth/authSlice";
import BMIPage from "./pages/BMIPage";
import BodyFatPage from "./pages/BodyFatPage";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // Load token from local storage on initial render
  useEffect(() => {
    if (token) {
      dispatch(loadUser()); // Load user data when the app starts
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BMIPage />} />
        <Route path="/bodyfat" element={<BodyFatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
