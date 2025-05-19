import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../pages/background3.jpg";
import "./LoginPage.css";

const LoginPage = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    city: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // تخزين التوكن في localStorage
    localStorage.setItem("authToken", "fake-token");
    setIsAuthenticated(true);
    navigate("/patient"); // بعد تسجيل الدخول، اذهب لصفحة المريض
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="tooth"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            fontSize: `${20 + Math.random() * 40}px`,
          }}
        >
          🦷
        </div>
      ))}

      <div className="login-box">
        <h1>تسجيل الدخول</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>اسم المستخدم:</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>كلمة المرور:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>المدينة:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>الهاتف:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">متابعة</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
