import React from "react";

const PrescriptionPage = () => {
  return (
    <div className="page-container">
      <h2>تحميل الروشتة</h2>
      <input type="file" accept=".pdf,.jpg,.png" />
      <button>رفع</button>
    </div>
  );
};

export default PrescriptionPage;