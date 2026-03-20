"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/user/navbar"; // Reusing the navbar for now, can customize later
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null); // Added state for Modal
  const router = useRouter();

  useEffect(() => {
    // Basic Auth Check
    const role = localStorage.getItem("role");
    if (role !== "corporator") {
      router.push("/login");
      return;
    }
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaint");
      const data = await response.json();
      if (response.ok) {
        // Filter by ward if needed (Simulated here)
        const wardNo = localStorage.getItem("wardNo");
        const filtered = data.complaints.filter(c => c.wardno == wardNo);
        setComplaints(filtered);
        
        // Calculate stats
        const pending = filtered.filter(c => c.status === "pending").length;
        const resolved = filtered.filter(c => c.status === "resolved").length;
        setStats({ total: filtered.length, pending, resolved });
      }
    } catch (error) {
      console.error("Error fetching complaints", error);
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

  if (loading) return <div className="p-10 text-center">Loading Admin Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Nagar Sevak Dashboard</h1>
          <p className="text-gray-600">Managing complaints for Ward No: {localStorage.getItem("wardNo")}</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
            <p className="text-gray-500 text-sm font-medium uppercase">Total Complaints</p>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500">
            <p className="text-gray-500 text-sm font-medium uppercase">Pending</p>
            <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
            <p className="text-gray-500 text-sm font-medium uppercase">Resolved</p>
            <p className="text-3xl font-bold text-gray-800">{stats.resolved}</p>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Summary</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Severity</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {complaints.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-500">No complaints reported in your ward.</td></tr>
              ) : complaints.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{c.summary}</p>
                    <p className="text-xs text-gray-500">{c.category} | {c.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      c.severity === 'High' ? 'bg-red-100 text-red-700' : 
                      c.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {c.severity || 'Medium'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`capitalize text-sm font-medium ${c.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex flex-col md:flex-row gap-2">
                    <button 
                      onClick={() => setSelectedComplaint(c)}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs transition"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => updateStatus(c.id, 'resolved')}
                      className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-xs transition"
                    >
                      Resolve
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
                  <p><span className="font-semibold text-gray-900">Severity:</span> <span className={`ml-1 px-2 py-0.5 rounded text-xs font-bold ${
                      selectedComplaint.severity === 'High' ? 'bg-red-100 text-red-700' : 
                      selectedComplaint.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>{selectedComplaint.severity || 'Medium'}</span></p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">AI Summary</h3>
                  <p className="bg-gray-50 p-3 rounded border border-gray-100">{selectedComplaint.summary}</p>
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
