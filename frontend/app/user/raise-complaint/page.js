"use client";
// Import necessary modules
import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import { useRouter } from "next/navigation";

// Define the UI component
export default function Page() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [wardno, setWardno] = useState("");
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setUserId(id);
    } else {
      router.push("/login");
    }
  }, []);

  const handleSubmit = async () => {
    if (!description || !wardno) {
      alert("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          wardno,
          id: userId,
        }),
      });

      // Check if the request was successful
      if (response.ok) {
        alert("Complaint submitted successfully!");
        // Clear form fields after successful submission if needed
        setDescription("");
        setWardno("");
        router.push("/user/complaints");
      } else {
        // Display error message if request failed
        alert("Failed to submit complaint");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <section className="bg-grey-70 dark:bg-gray-900">
        <div className="py-10 px-28">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Raise a Complaint
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Complaint Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-3 h-40 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm"
                    placeholder="Describe your issue in detail (e.g., Pothole on main street, water leakage)..."
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="wardno"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ward no
                  </label>
                  <input
                    value={wardno}
                    onChange={(e) => setWardno(e.target.value)}
                    type="text"
                    name="wardno"
                    id="wardno"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-3 h-11 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm"
                    placeholder="Enter Ward Number (e.g., 42)"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 transition-all"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Complaint"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
