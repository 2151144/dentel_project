import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const API_URL = "http://127.0.0.1:5001"; // يمكن تعديله بناءً على متغيرات البيئة

const HistoryPage = ({ userId }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${API_URL}/analyses/${userId}`);
                const data = await response.json();
                console.log("🔥 البيانات المسترجعة:", data); // ✅ تحقق من البيانات هنا

                if (response.ok) {
                    if (Array.isArray(data) && data.length > 0) {
                        const formattedData = data.map(item => ({
                            ...item,
                            date: new Date(item.date).toLocaleDateString(), // تحسين عرض التاريخ
                            severity: item.severity || 0 // ضمان عدم وجود قيم غير معروفة
                        }));
                        setHistory(formattedData);
                    } else {
                        console.warn("⚠️ لا توجد بيانات متاحة.");
                    }
                } else {
                    console.error("❌ خطأ أثناء جلب البيانات:", data.message);
                }
            } catch (error) {
                console.error("⚠️ فشل الاتصال بالسيرفر:", error);
            }
            setLoading(false);
        };

        fetchHistory();
    }, [userId]);

    return (
        <div>
            <h2>📊 تاريخ تحليلات الأسنان</h2>

            {loading ? (
                <p>⏳ جاري تحميل البيانات...</p>
            ) : history.length === 0 ? (
                <p>⚠️ لا يوجد بيانات تحليل حتى الآن.</p>
            ) : (
                <LineChart width={600} height={300} data={history}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Tooltip />
                    <Line type="monotone" dataKey="severity" stroke="#8884d8" />
                </LineChart>
            )}
        </div>
    );
};

export default HistoryPage;
