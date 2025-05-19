import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientPage.css"; // استيراد ملف الـ CSS

const floatingEmojis = ["🦷", "💊", "🩺", "🏥", "🔬", "🩹", "💉"];

const PatientPage = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showCard, setShowCard] = useState(false);

  const patients = ["Ahmed", "Sara", "Mohamed", "Amina", "Omar", "Hassan"];
  const commonCases = ["Cavity", "Gum Disease", "Tooth Decay", "Implant Needed"];

  useEffect(() => {
    if (patientName.length > 0) {
      setSuggestions(
        patients.filter((name) => name.toLowerCase().startsWith(patientName.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  }, [patientName]);

  const handleContinue = () => {
    if (!patientName) {
      alert(language === "en" ? "Please enter a patient name!" : "يرجى إدخال اسم المريض!");
      return;
    }
    setShowCard(true);
    navigate("/upload");
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleBack = () => navigate("/");

  return (
    <div className={`patient-page ${darkMode ? "dark-mode" : ""}`}>

      {/* الرموز المتحركة */}
      {floatingEmojis.map((emoji, index) => (
        <span
          key={index}
          className="floatingEmoji"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 5 + 3}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* زر القائمة الجانبية */}
      <button onClick={toggleMenu} className="menuButton">📜</button>

      {/* القائمة الجانبية */}
      {menuOpen && (
        <div className="menu">
          <h3>📌 Menu</h3>
          <p onClick={toggleLanguage} className="menuItem">
            <strong>🌐 Language:</strong> {language === "en" ? "English" : "العربية"}
          </p>
          <p onClick={toggleDarkMode} className="menuItem">
            <strong>🌙 Dark Mode:</strong> {darkMode ? "On" : "Off"}
          </p>

          <h4>📅 Previous Visits</h4>
          <ul>
            {patients.map((name, index) => (
              <li key={index} className="menuItem">🦷 {name} - {Math.floor(Math.random() * 12) + 1} days ago</li>
            ))}
          </ul>

          <h4>🚑 Common Cases</h4>
          <ul>
            {commonCases.map((caseName, index) => (
              <li key={index} className="menuItem">🔬 {caseName}</li>
            ))}
          </ul>

          <p onClick={handleBack} className="backButton">🔙 Back to Login</p>
        </div>
      )}

      {/* نموذج إدخال اسم المريض */}
      <div className="formContainer">
        <h2>🦷💊 Welcome to my App! 🏥🩺</h2>

        <input
          type="text"
          placeholder={language === "en" ? "Patient Name" : "اسم المريض"}
          className="input"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        {/* قائمة الاقتراحات */}
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((name, index) => (
              <li key={index} onClick={() => setPatientName(name)}>{name}</li>
            ))}
          </ul>
        )}

        <button
          className={`button ${patientName ? "active" : "disabled"}`}
          onClick={handleContinue}
          disabled={!patientName}
        >
          {language === "en" ? "CONTINUE" : "متابعة"}
        </button>
      </div>

      {/* كارت بيانات المريض */}
      {showCard && (
        <div className="card">
          <h3>📋 Patient Info</h3>
          <p><strong>🆔 Name:</strong> {patientName}</p>
          <p><strong>🕒 Last Visit:</strong> {Math.floor(Math.random() * 12) + 1} Days Ago</p>
          <p><strong>🦷 Condition:</strong> {commonCases[Math.floor(Math.random() * commonCases.length)]}</p>
        </div>
      )}
    </div>
  );
};

export default PatientPage;
