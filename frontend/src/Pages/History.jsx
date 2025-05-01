import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ai/histery`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch records");
        }
  
        setRecords(result.data || []); // Use `result.data` since your backend returns `{ success: true, data: [...] }`
      } catch (error) {
        console.error("Failed to fetch records:", error.message);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-blue-600">Patient History</h1>
      <p className="text-gray-500 mt-1 mb-6 text-lg max-w-3xl">
        Review patient heart health records and diagnosis history to ensure accurate medical assessment and follow-up care.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded">All Records</button>
        <button className="border px-4 py-2 rounded">Heart-Attack Free</button>
        <button className="border px-4 py-2 rounded">Heart-Attack Risk</button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center w-full max-w-xl bg-blue-100 rounded-full px-4 py-2">
          <input
            className="bg-transparent border-none focus:outline-none w-full"
            placeholder="Search history records..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </div>

        <button className="ml-4 bg-white shadow px-4 py-2 rounded-2xl flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-11 4h12m-9 4h6" />
          </svg>
          Filter
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-200">
            <tr className="text-sm text-black">
              {["S.No", "Chest Pain", "Resting BP", "Cholesterol", "Fasting BP", "ECG Results", "Max Heart Rate", "Angina", "Depression", "ST Segment", "Blood Vessels", "Thalassemia", "Result", "Time"].map((heading) => (
                <th key={heading} className="px-4 py-2 whitespace-nowrap">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr className="bg-gray-200 h-10">
                <td colSpan={14} className="text-center text-gray-500">
                  No records available.
                </td>
              </tr>
            ) : (
              records.map((record, index) => (
                <tr key={index} className="even:bg-gray-100 odd:bg-white">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{record.chestPain}</td>
                  <td className="px-4 py-2">{record.restingBP}</td>
                  <td className="px-4 py-2">{record.cholesterol}</td>
                  <td className="px-4 py-2">{record.fastingBP}</td>
                  <td className="px-4 py-2">{record.ecgResults}</td>
                  <td className="px-4 py-2">{record.maxHeartRate}</td>
                  <td className="px-4 py-2">{record.angina}</td>
                  <td className="px-4 py-2">{record.depression}</td>
                  <td className="px-4 py-2">{record.stSegment}</td>
                  <td className="px-4 py-2">{record.bloodVessels}</td>
                  <td className="px-4 py-2">{record.thalassemia}</td>
                  <td className="px-4 py-2">{record.result}</td>
                  <td className="px-4 py-2">{record.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center space-x-2 text-sm text-gray-700">
        {["1", "2", "3", "...", "67", "68"].map((num, i) => (
          <button
            key={i}
            className={`w-8 h-8 p-0 rounded-full ${num === "1" ? "bg-black text-white" : "hover:bg-gray-200"}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default History;
