"use client";
import React from "react";
import Navbar from "../components/navbar";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-black text-indigo-900 mb-6">About JanHit Connect</h1>
          <p className="text-xl text-gray-600 font-medium">Empowering the common citizen with AI-driven civic oversight and real-time governance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-indigo-50 p-12 rounded-[50px]">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 font-primary">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-6 font-medium">To bridge the gap between citizens and municipal authorities by leveraging state-of-the-art Artificial Intelligence to automate complaint prioritization and resource allocation.</p>
                <div className="flex gap-4">
                    <span className="bg-indigo-600 text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase">AI-Powered</span>
                    <span className="bg-white text-indigo-600 px-4 py-2 rounded-2xl text-xs font-bold uppercase border border-indigo-100 shadow-sm">Real-time</span>
                    <span className="bg-white text-indigo-600 px-4 py-2 rounded-2xl text-xs font-bold uppercase border border-indigo-100 shadow-sm">Open-Gov</span>
                </div>
            </div>
            
            <div className="space-y-8">
                <div className="flex gap-6">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-100">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Ward-Level Intelligence</h3>
                        <p className="text-gray-500 mt-2 font-medium">Every complaint is automatically routed to the correct Nagar Sevak based on geographical jurisdiction.</p>
                    </div>
                </div>

                <div className="flex gap-6">
                   <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-100">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Priority Matrix</h3>
                        <p className="text-gray-500 mt-2 font-medium">Advanced NLP identifies the urgency of an issue, ensuring that emergency situations get instant attention.</p>
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Resource Optimization</h3>
                        <p className="text-gray-500 mt-2 font-medium">AI-driven predictive models assist mayors and collectors in planning municipal water and electricity distribution.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
