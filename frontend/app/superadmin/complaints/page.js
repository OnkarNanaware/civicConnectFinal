"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/super-admin/navbar";

export default function SuperAdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaint");
      const data = await response.json();
      if (response.ok) {
        setComplaints(data.complaints);
      }
    } catch (error) {
      console.error("Error fetching all complaints", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 uppercase tracking-tight">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-black text-indigo-900 mb-8">GLOBAL COMPLAINT LEDGER</h1>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-5 font-bold uppercase text-sm">Ward</th>
                <th className="px-6 py-5 font-bold uppercase text-sm">Description</th>
                <th className="px-6 py-5 font-bold uppercase text-sm">Dept</th>
                <th className="px-6 py-5 font-bold uppercase text-sm">Severity</th>
                <th className="px-6 py-5 font-bold uppercase text-sm">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.length === 0 ? (
                <tr><td colSpan="5" className="p-20 text-center text-gray-400 font-medium">System database is empty.</td></tr>
              ) : complaints.map((c) => (
                <tr key={c.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4 font-black text-indigo-500">#{c.wardno}</td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 font-medium line-clamp-1">{c.summary}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{c.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-600 border border-gray-200 px-2 py-1 rounded">{c.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${
                        c.severity === 'High' ? 'bg-red-500 text-white shadow-lg shadow-red-200' :
                        c.severity === 'Medium' ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-100' :
                        'bg-emerald-400 text-white shadow-lg shadow-emerald-100'
                    }`}>
                        {c.severity || 'LOW'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${c.status === 'resolved' ? 'bg-emerald-500 animate-pulse' : 'bg-yellow-500 animate-bounce'}`}></div>
                        <span className="text-xs font-bold uppercase text-gray-700">{c.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
