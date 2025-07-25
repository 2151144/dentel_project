/*
  ==============================================================
  Author: Abdelkhalek Soudy
  Project: Dental Disease Detection and Chatbot Assistant (Frontend)
  Date: 2025
  All rights reserved © Abdelkhalek Soudy
  ==============================================================
*/

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import "./UploadPage.css";
import { AppContext } from "../App";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5001";

const diseaseTranslations = {
  "Filling": "حشو",
  "Implant": "زراعة",
  "Cavity": "تسوس",
  "Impacted Tooth": "ضرس مدفون"
};

const preventionTranslations = {
  "Maintain good oral hygiene": "حافظ على نظافة الفم الجيدة",
  "Visit your dentist regularly": "قم بزيارة طبيب الأسنان بانتظام",
  "Avoid sugary foods": "تجنب الأطعمة السكرية"
};

const adviceTranslations = {
  "Filling": "Avoid chewing hard foods.",
  "Implant": "Follow post-surgery care instructions.",
  "Cavity": "Brush twice a day with fluoride toothpaste.",
  "Impacted Tooth": "Consult your dentist for possible extraction."
};

const adviceTranslationsAr = {
  "Filling": "تجنب مضغ الأطعمة الصلبة.",
  "Implant": "اتبع تعليمات العناية بعد الجراحة.",
  "Cavity": "اغسل أسنانك مرتين يوميًا بمعجون يحتوي على الفلورايد.",
  "Impacted Tooth": "استشر طبيب الأسنان لاستخراج الضرس إذا لزم الأمر."
};

function UploadPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { language, setLanguage } = useContext(AppContext);
  const navigate = useNavigate();

  const [diseaseResults, setDiseaseResults] = useState(() => {
    const savedResults = localStorage.getItem("lastDiagnosis");
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setDiseaseResults([]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert(language === "en" ? "🚨 Please select an image first!" : "🚨 الرجاء اختيار صورة أولاً!");
      return;
    }

    if (!selectedImage.type.match(/^image\/(jpeg|png|jpg|bmp|gif)$/)) {
      alert(language === "en" ? "🚨 Invalid image format!" : "🚨 صيغة الصورة غير صالحة!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert(language === "en" ? "❌ You must log in first!" : "❌ يجب تسجيل الدخول أولاً!");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Prediction failed");
      }

      const data = await response.json();
      setDiseaseResults(data.detections || []);
      localStorage.setItem("lastDiagnosis", JSON.stringify(data.detections || []));
    } catch (error) {
      alert(language === "en" ? `❌ Error: ${error.message}` : `❌ خطأ: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDiseaseResults([]);
    localStorage.removeItem("lastDiagnosis");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <div className="upload-container decorated-background" dir={language === "ar" ? "rtl" : "ltr"}>
      <button onClick={toggleLanguage} className="lang-btn">
        {language === "en" ? "العربية" : "English"}
      </button>

      <h1>🦷 {language === "en" ? "Dental Disease Detection" : "اكتشاف أمراض الأسنان"}</h1>

      <div className="upload-box">
        <label className="file-input-label">
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          <span className="custom-file-button">📁 {language === "en" ? "Choose Image" : "اختر صورة"}</span>
        </label>

        {imagePreview && <img src={imagePreview} alt="Uploaded Preview" className="preview-image" />}
      </div>

      <button onClick={handleUpload} disabled={isLoading} className="analyze-button">
        {isLoading ? "⏳ Processing..." : `🔍 ${language === "en" ? "Analyze" : "تحليل"}`}
      </button>

      <button onClick={clearResults} className="clear-button">❌ {language === "en" ? "Clear" : "مسح"}</button>

      {isLoading && <p>⏳ {language === "en" ? "Analyzing image..." : "جاري تحليل الصورة..."}</p>}

      <div className="results-container">
        {Array.isArray(diseaseResults) && diseaseResults.map((result, index) => (
          <Card key={index} className="disease-result">
            <CardContent>
              <h2>{language === "en" ? result.disease : diseaseTranslations[result.disease] || result.disease}</h2>
              <p>Score: {result.score.toFixed(2)}</p>
              <p>{language === "en" ? result.prevention : preventionTranslations[result.prevention] || result.prevention}</p>
              <p>{language === "en" ? adviceTranslations[result.disease] : adviceTranslationsAr[result.disease]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UploadPage;
