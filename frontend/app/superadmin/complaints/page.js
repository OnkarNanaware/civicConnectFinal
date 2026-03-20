"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/super-admin/navbar";

export default function SuperAdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

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

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch("/api/complaint/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) {
        alert(`Complaint successfully ${newStatus === 'resolved' ? 'Resolved' : 'Updated'}`);
        fetchComplaints(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating status", error);
      alert("Error updating complaint status");
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
                <th className="px-6 py-5 font-bold uppercase text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.length === 0 ? (
                <tr><td colSpan="6" className="p-20 text-center text-gray-400 font-medium">System database is empty.</td></tr>
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
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedComplaint(c)}
                      className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Complaint Details Modal --- */}
        {selectedComplaint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative my-8">
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Complaint Details</h2>
              <div className="space-y-4 text-gray-700">
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                  <p><span className="font-semibold text-gray-900">Category:</span> {selectedComplaint.category}</p>
                  <p><span className="font-semibold text-gray-900">Date:</span> {selectedComplaint.date}</p>
                  <p><span className="font-semibold text-gray-900">Status:</span> <span className={`capitalize ${selectedComplaint.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'} font-bold`}>{selectedComplaint.status}</span></p>
                  <p><span className="font-semibold text-gray-900">Raised By ID:</span> {selectedComplaint.raisedby}</p>
                  <p><span className="font-semibold text-gray-900">Ward No:</span> {selectedComplaint.wardno}</p>
                  <p><span className="font-semibold text-gray-900">Severity:</span> <span className={`ml-1 px-2 py-0.5 rounded text-xs font-bold ${
                      selectedComplaint.severity === 'High' ? 'bg-red-100 text-red-700' : 
                      selectedComplaint.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>{selectedComplaint.severity || 'Medium'}</span></p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Summary</h3>
                  <p className="bg-gray-50 p-3 rounded border border-gray-100 capitalize-first">{selectedComplaint.summary}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mt-4 mb-1">Full Description</h3>
                  <p className="bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap">{selectedComplaint.complaint}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3 border-t pt-4">
                <button 
                  onClick={() => setSelectedComplaint(null)}
                  className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Close
                </button>
                {selectedComplaint.status !== 'resolved' && (
                  <button 
                    onClick={() => {
                      updateStatus(selectedComplaint.id, 'resolved');
                      setSelectedComplaint(null);
                    }}
                    className="px-5 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
