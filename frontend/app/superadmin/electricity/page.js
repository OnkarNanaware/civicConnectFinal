"use client";
import React, { useState } from "react";
import Navbar from "../../components/super-admin/navbar";

export default function SuperAdminElectricity() {
  const [totalPeople, setTotalPeople] = useState("");
  const [season, setSeason] = useState("No");
  const [isConstruction, setIsConstruction] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict-power", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_people: parseInt(totalPeople),
          festive_season: season,
          isConstruction: isConstruction,
        }),
      });
      const data = await response.json();
      setPrediction(data.predicted_power);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Failed to get prediction from AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6 py-12 grow flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tighter">ELECTRICITY LOAD PREDICTION</h1>
        <p className="text-gray-500 mb-10 max-w-lg text-center font-medium">System-level predictive analysis for municipal power grid management.</p>
        
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 w-full max-w-xl">
          <form onSubmit={handlePredict} className="space-y-8">
            <div className="group">
              <label className="block text-xs font-black text-blue-900 uppercase tracking-widest mb-3">Total Population (Ward Target)</label>
              <input 
                type="number" 
                value={totalPeople}
                onChange={(e) => setTotalPeople(e.target.value)}
                className="w-full bg-blue-50/50 border-0 rounded-2xl px-6 py-4 text-gray-800 font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                placeholder="Ex: 15400"
                required
              />
            </div>

            <div className="group">
                <label className="block text-xs font-black text-blue-900 uppercase tracking-widest mb-3">Festive Season Buffer</label>
                <select 
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full bg-blue-50/50 border-0 rounded-2xl px-6 py-4 text-gray-800 font-bold focus:ring-4 focus:ring-blue-100 transition-all outline-none appearance-none"
                >
                    <option value="No">No (Standard Load)</option>
                    <option value="Yes">Yes (Peak Demand)</option>
                </select>
            </div>

            <div className="flex items-center gap-4 bg-yellow-50 p-6 rounded-3xl border border-yellow-100">
                <input 
                  type="checkbox" 
                  checked={isConstruction}
                  onChange={(e) => setIsConstruction(e.target.checked)}
                  className="w-6 h-6 rounded-full text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div>
                   <span className="block text-sm font-black text-yellow-900">NEW CONSTRUCTION DETECTED</span>
                   <span className="block text-[10px] text-yellow-700 uppercase font-bold mt-1">Adjusts for industrial load spikes</span>
                </div>
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white rounded-3xl py-5 font-black uppercase text-sm tracking-widest shadow-2xl shadow-blue-200 hover:bg-black transition-all disabled:opacity-50"
            >
                {loading ? 'Consulting AI Grid Model...' : 'Execute Predictive Analysis'}
            </button>
          </form>

          {prediction && (
            <div className="mt-12 pt-10 border-t border-dashed border-gray-200 text-center animate-in fade-in slide-in-from-bottom-5">
                <span className="inline-block bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Target Load Optimized</span>
                <p className="text-6xl font-black text-blue-900 tabular-nums">{prediction} <span className="text-xl">MW</span></p>
                <p className="text-xs text-gray-400 font-bold mt-4 uppercase italic">Estimated consumption pattern for next 168 hours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
