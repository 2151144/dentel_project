import React, { useState, useContext } from "react";
import { AppContext } from "../App";

const BookingPage = () => {
  const { API_BASE_URL } = useContext(AppContext);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("❌ يجب تسجيل الدخول أولاً.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, time }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ تم حجز الموعد بنجاح.");
        setDate("");
        setTime("");
      } else {
        setMessage(data.error || "حدث خطأ أثناء الحجز.");
      }
    } catch (error) {
      setMessage("⚠ خطأ في الاتصال بالسيرفر.");
    }
  };

  return (
    <div className="page-container">
      <h2>حجز موعد</h2>
      <label>اختر التاريخ:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <label>اختر الوقت:</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={handleBooking}>احجز الآن</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingPage;
