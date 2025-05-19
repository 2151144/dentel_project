import React, { useState, useEffect } from "react";
import "./SettingsPage.css";

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  // تطبيق الوضع الداكن عند تحميل الصفحة
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // تبديل الوضع الداكن مع الحفظ
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
      return newMode;
    });
  };

  // تغيير اللغة مع الحفظ
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <div className="settings-container">
      <h1>⚙️ {language === "English" ? "Settings" : "الإعدادات"}</h1>

      <div className="setting-item">
        <label>🌍 {language === "English" ? "Language:" : "اللغة:"}</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Arabic">العربية</option>
        </select>
      </div>

      <div className="setting-item">
        <label>🌗 {language === "English" ? "Dark Mode:" : "الوضع الداكن:"}</label>
        <button onClick={toggleDarkMode} className={darkMode ? "dark-btn" : ""}>
          {darkMode
            ? language === "English"
              ? "Disable Dark Mode"
              : "إيقاف الوضع الداكن"
            : language === "English"
            ? "Enable Dark Mode"
            : "تفعيل الوضع الداكن"}
        </button>
      </div>

      <div className="setting-item">
        <label>🔔 {language === "English" ? "Notifications:" : "الإشعارات:"}</label>
        <input type="checkbox" id="notifications" />
        <label htmlFor="notifications">
          {language === "English" ? "Enable Notifications" : "تفعيل الإشعارات"}
        </label>
      </div>

      <div className="setting-item">
        <h3>ℹ️ {language === "English" ? "About the App" : "عن التطبيق"}</h3>
        <p>{language === "English" ? "Version: 1.0.0" : "الإصدار: 1.0.0"}</p>
        <p>{language === "English" ? "Developed by Abdelkhalek" : "تم التطوير بواسطة عبد الخالق"}</p>
      </div>
    </div>
  );
}

export default SettingsPage;
