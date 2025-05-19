import React from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = ({ language }) => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      {/* أشكال مزخرفة متحركة */}
      <div className="decorative-shape shape1"></div>
      <div className="decorative-shape shape2"></div>
      <div className="decorative-shape shape3"></div>
      <div className="decorative-shape shape4"></div>

      {/* رسالة الترحيب الثابتة */}
      <div className="welcome-popup">
        {language === "en" ? "Welcome to our platform! Please sign up." : "مرحباً بك في منصتنا! الرجاء التسجيل."}
      </div>

      <div className="register-box">
        <h2>{language === "en" ? "Register" : "تسجيل جديد"}</h2>
        <input type="text" placeholder={language === "en" ? "Username" : "اسم المستخدم"} />
        <input type="password" placeholder={language === "en" ? "Password" : "كلمة المرور"} />
        <button onClick={() => navigate("/login")}>
          {language === "en" ? "Register" : "تسجيل"}
        </button>
        <p>
          {language === "en" ? "Already have an account?" : "لديك حساب بالفعل؟"}
          <span onClick={() => navigate("/login")}>
            {language === "en" ? " Login here" : " سجل الدخول هنا"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
