import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/ai/history`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();


        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch records");
        }

        const sortedRecords = result.data
          ? result.data.sort(
              (a, b) => new Date(a.created_at) - new Date(b.created_at)
            )
          : [];
        setRecords(sortedRecords);
      } catch (error) {
        console.error("Failed to fetch records:", error.message);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchData();
  }, []);

  const skeletonRows = Array.from({ length: 3 });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-blue-600">Patient History</h1>
      <p className="text-gray-500 mt-1 mb-6 text-lg max-w-3xl">
        Review patient heart health records and diagnosis history to ensure
        accurate medical assessment and follow-up care.
      </p>


      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-200">
            <tr className="text-sm text-black">
              {[
                "S.No",
                "Chest Pain",
                "Resting BP",
                "Cholesterol",
                "Fasting BP",
                "ECG Results",
                "Max Heart Rate",
                "Angina",
                "Depression",
                "ST Segment",
                "Blood Vessels",
                "Thalassemia",
                "Result",
                "Time",

              ].map((heading) => (
                <th key={heading} className="px-4 py-2 whitespace-nowrap">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              skeletonRows.map((_, i) => (
                <tr key={i} className="animate-pulse bg-gray-100">
                  {Array.from({ length: 14 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))            ) : records.length === 0 ? (
              <tr className="bg-gray-200 h-10">
                <td colSpan={14} className="text-center text-gray-500">
                  No records available.
                </td>
              </tr>
            ) : (
              records.map((record, index) => (
                <tr key={index} className="even:bg-gray-100 odd:bg-white">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {record.cp === 0
                      ? "Typical Angina"
                      : record.cp === 1
                      ? "Atypical Angina"
                      : record.cp === 2
                      ? "Non-Anginal Pain"
                      : record.cp === 3
                      ? "Asymptomatic"
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.trestbps >= 80 && record.trestbps <= 200
                      ? record.trestbps
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.chol >= 100 && record.chol <= 500
                      ? record.chol
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.fbs === 0
                      ? "Normal"
                      : record.fbs === 1
                      ? "High"
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.restecg === 0
                      ? "Normal"
                      : record.restecg === 1
                      ? "ST-T Wave Abnormality"
                      : record.restecg === 2
                      ? "Left Ventricular Hypertrophy"
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.thalach >= 60 && record.thalach <= 220
                      ? record.thalach
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.exang === 0
                      ? "No"
                      : record.exang === 1
                      ? "Yes"
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.oldpeak >= 0.0 && record.oldpeak <= 6.0
                      ? record.oldpeak
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.slope === 0
                      ? "Upsloping"
                      : record.slope === 1
                      ? "Flat"
                      : record.slope === 2
                      ? "Downsloping"
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.ca >= 0 && record.ca <= 3 ? record.ca : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.thal === 1
                      ? "Normal"
                      : record.thal === 2
                      ? "Fixed Defect"
                      : record.thal === 3
                      ? "Reversible Defect"
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {record.target_multi === 0
                      ? "No Heart Disease"
                      : record.target_multi === 1
                      ? "Coronary Artery Disease"
                      : record.target_multi === 2
                      ? "Heart Failure"
                      : record.target_multi === 3
                      ? "Arrhythmia"
                      : record.target_multi === 4
                      ? "Valvular Heart Disease"
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(record.created_at).toLocaleString() || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default History;
