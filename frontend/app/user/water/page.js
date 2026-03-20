"use client";
import React, { useState } from "react";
import Navbar from "../../components/user/navbar";

export default function WaterPage() {
  const [noOfPeople, setNoOfPeople] = useState(0);
  const [season, setSeason] = useState("Summer");
  const [isConstructionGoingOn, setIsConstructionGoingOn] = useState(false);
  const [predictedWater, setPredictedWater] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict-water", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_people: parseInt(noOfPeople),
          season,
          isConstruction: isConstructionGoingOn,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPredictedWater(data.predicted_water);
      } else {
        alert(data.error || "Failed to predict water usage");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Error connecting to the prediction server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-blue-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Water Usage Prediction</h1>
            <p className="text-blue-100 italic">Predict your community's water needs for the coming week.</p>
          </div>
          
          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Number of People in Ward</label>
                <input
                  type="number"
                  value={noOfPeople}
                  onChange={(e) => setNoOfPeople(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="e.g. 500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Select Season</label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                >
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="Rainy">Rainy</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                checked={isConstructionGoingOn}
                onChange={() => setIsConstructionGoingOn(!isConstructionGoingOn)}
                className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                id="construction"
              />
              <label htmlFor="construction" className="text-gray-700 font-medium cursor-pointer">
                Is there active construction in this area?
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg transform active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:bg-gray-400"
            >
              {loading ? "Calculating..." : "Predict Next Week's Usage"}
            </button>
          </form>

          {predictedWater !== null && (
            <div className="px-8 pb-8">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-semibold uppercase tracking-wider text-sm">Estimated Weekly Usage</span>
                  <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-blue-300">AI PREDICTION</span>
                </div>
                <div className="mt-2 text-4xl font-black text-blue-900">
                  {predictedWater} <span className="text-xl font-normal">Litres</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
