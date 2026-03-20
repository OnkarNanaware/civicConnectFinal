// import React{ useState } from "react";
"use client";
import React from "react";
import { useState } from "react";
export default function PredictWater() {
  const [noOfPeople, setNoOfPeople] = useState(0);
  const [hide, setHide] = useState(true);
  const [season, setSeason] = useState("No Season Selected");
  const [isConstructionGoingOn, setIsConstructionGoingOn] = useState(false);
  const [wardNO, setWardNo] = useState(0);
  const [predictedWater, setPredictedWater] = useState(0);

  const handleSeason = (season) => {
    setSeason(season);
    setHide((prev) => !prev);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(season);
    if (season === "No Season Selected") {
      alert("Select Season");
      return;
    }
    if (noOfPeople <= 1) {
      alert("Number of people should be greater than 1");
      return;
    }
    console.log(noOfPeople, season, isConstructionGoingOn, wardNO);

    // call the api to predict the water
    fetch("http://localhost:5000/predict-water", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total_people: noOfPeople,
        season,
        isConstruction: isConstructionGoingOn,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // alert(`Predicted Water: ${data.predicted_water}`);
        setPredictedWater(data.predicted_water);
      })
      .catch((err) => {
        console.log(err);
        alert("Error in predicting water");
      }
      );
  };

  return (
    <section className="container max-w-xl mx-auto p-13">
      <div className="border border-gray-200 rounded-lg shadow-lg p-14 h-auto w-auto">
        <form className="mx-auto" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="m-8 relative z-0 w-full mb-5 group">
              <input
                type="number"
                value={noOfPeople}
                onChange={(e) => setNoOfPeople(e.target.value)}
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                No of People
              </label>
            </div>
            <div className="flex justify-center items-center m-5 relative z-0 w-full mb-5 group">
              <select
                id="seasonSelect"
                onChange={(e) => handleSeason(e.target.value)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <option value="">Select Season</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Rainy">Rainy</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="m-5 relative z-0 w-full mb-5 group">
              <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  checked={isConstructionGoingOn}
                  id="bordered-checkbox-2"
                  onClick={() => setIsConstructionGoingOn((prev) => !prev)}
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-checkbox-2"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Is Construction Going On?
                </label>
              </div>
            </div>
            <div className="m-5 relative z-0 w-full mb-5 group">
              <input
                type="number"
                onChange={(e) => {
                  setWardNo(() => e.target.value);
                }}
                value={wardNO}
                name="floating_company"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Ward No
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Avabliable Water: 8654279 Litres
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Predicted Water Uses: {predictedWater} Litres in next week
              </p>

            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
