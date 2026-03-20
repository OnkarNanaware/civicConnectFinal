"use client";
import React from "react";
import Navbar from "../components/navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-black text-indigo-900 mb-6 tracking-tighter italic">Connect With JanHit</h1>
          <p className="text-xl text-gray-500 font-medium tracking-tight">Got a suggestion or a problem? Our municipal response team is here for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="bg-indigo-900 p-12 rounded-[50px] shadow-2xl text-white">
                <h2 className="text-4xl font-extrabold mb-8 italic">Contact Info</h2>
                <div className="space-y-10">
                    <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 bg-indigo-800 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-700">
                             <svg className="w-6 h-6 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                        <div>
                            <span className="block text-indigo-200 font-black text-[10px] uppercase">Service Hotline</span>
                            <span className="text-xl font-bold tracking-tight">1800-JANHIT (24/7)</span>
                        </div>
                    </div>

                    <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 bg-indigo-800 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-700">
                             <svg className="w-6 h-6 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"></path></svg>
                        </div>
                        <div>
                            <span className="block text-indigo-200 font-black text-[10px] uppercase">Official Email</span>
                            <span className="text-xl font-bold tracking-tight">support@janhit.gov.in</span>
                        </div>
                    </div>

                    <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 bg-indigo-800 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-700">
                             <svg className="w-6 h-6 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                        </div>
                        <div>
                            <span className="block text-indigo-200 font-black text-[10px] uppercase">Main Ward HQ</span>
                            <span className="text-lg font-bold tracking-tight italic">Shivaji Nagar Ward Office, Pune</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-[10px] border-indigo-50 p-12 rounded-[50px] shadow-sm">
                 <h2 className="text-3xl font-black text-indigo-900 mb-8 italic uppercase tracking-tighter">Send Message</h2>
                 <form className="space-y-6">
                    <div>
                        <input type="text" className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none font-bold" placeholder="Your Name" />
                    </div>
                    <div>
                        <input type="email" className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none font-bold" placeholder="Email Address" />
                    </div>
                    <div>
                        <textarea className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 outline-none h-40 font-bold resize-none" placeholder="How can we help?"></textarea>
                    </div>
                    <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-500 transition-colors shadow-2xl shadow-indigo-100">Broadcast Message</button>
                 </form>
            </div>
        </div>
      </div>
    </div>
  );
}
