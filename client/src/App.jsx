import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import "./App.css";
import { loadUser } from "./features/auth/authSlice";
import BMIPage from "./pages/BMIPage";
import BodyFatPage from "./pages/BodyFatPage";
import Layout from "./pages/Layout";
import OfferPage from "./pages/OfferPage";

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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/offer" element={<OfferPage />} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
