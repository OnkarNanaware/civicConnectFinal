"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/super-admin/navbar";
import Link from "next/link";

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({ users: 0, officers: 0, complaints: 0 });

  useEffect(() => {
    // In a real app, fetch these from an API
    setStats({ users: 154, officers: 12, complaints: 89 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">SuperAdmin Overview</h1>
          <p className="text-lg text-gray-600">Global system management and cross-ward monitoring.</p>
        </header>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            <Link href="/superadmin/nagar-sevak" className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                    <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                        <svg className="w-6 h-6 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">Manage Nagar Sevaks</h2>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed mb-4">View, edit, or add corporators for various wards.</p>
                </div>
                <span className="inline-block mt-auto text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform text-sm">Configure Officers →</span>
            </Link>

            <Link href="/superadmin/complaints" className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                    <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                        <svg className="w-6 h-6 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">Global Complaint Ledger</h2>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed mb-4">Monitor all civic issues across all wards in real-time.</p>
                </div>
                <span className="inline-block mt-auto text-red-600 font-semibold group-hover:translate-x-1 transition-transform text-sm">Audit Complaints →</span>
            </Link>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 italic flex items-center justify-center text-gray-400 text-sm h-full min-h-[160px]">
                AI Analytics (Coming Soon)
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 italic flex items-center justify-center text-gray-400 text-sm h-full min-h-[160px]">
                System Health Monitoring
            </div>
        </div>

        {/* Global Stats */}
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center uppercase tracking-widest">Platform Pulse</h3>
            <div className="flex flex-wrap justify-around items-center text-center gap-8">
                <div className="flex flex-col">
                    <span className="text-5xl font-black text-indigo-600">{stats.users}</span>
                    <span className="text-gray-500 font-semibold mt-2 uppercase text-xs">Active Citizens</span>
                </div>
                <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
                <div className="flex flex-col">
                    <span className="text-5xl font-black text-green-500">{stats.officers}</span>
                    <span className="text-gray-500 font-semibold mt-2 uppercase text-xs">Total Nagar Sevaks</span>
                </div>
                <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
                <div className="flex flex-col">
                    <span className="text-5xl font-black text-red-500">{stats.complaints}</span>
                    <span className="text-gray-500 font-semibold mt-2 uppercase text-xs">Total Complaints</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
