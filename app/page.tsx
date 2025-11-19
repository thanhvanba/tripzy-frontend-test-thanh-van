"use client";

import { useState } from "react";
import { Tabs, Card, Segmented } from "antd";
import { SearchForm } from "./components/search-form";
import Header from "./components/header";
import { FaBusAlt, FaHotel } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";

import "./globals.css";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("bus");

  return (
    <div className="">
      {/* Header */}
      <Header />
      <div className="relative">
        <div className="flex flex-col items-center justify-center min-h-[40vh] sm:min-h-[45vh] py-8 sm:py-12 pt-20 sm:pt-24 bg-linear-to-b from-[#F5F8FF] to-[#DBF5FF] relative">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-[#121216] text-center">
              Travel Smarter, Not Harder
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#767689] text-center">
              Make every trip effortless. Tripzy lets you book rides and plan
              journeys with ease
            </p>
          </div>
        </div>

        <div className="container absolute top-3/4 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-6 w-full rounded-2xl shadow-lg bg-white">
            <div className="flex justify-center w-full rounded-2xl shadow-lg">
              <Segmented
                block
                value={activeTab}
                onChange={(val) => setActiveTab(val as string)}
                size="large"
                className="w-full p-2 sm:p-3! bg-white! tabs-home"
                options={[
                  {
                    label: (
                      <div
                        className={`flex items-center justify-center sm:justify-start px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-[#121216] rounded-lg hover:bg-[#EBF9FF] ${
                          activeTab === "bus" ? "bg-[#EBF9FF]" : ""
                        }`}
                      >
                        <div className="bg-[#D3F3FF] rounded-full p-1.5 sm:p-2.5">
                          <FaBusAlt className="text-[#19C0FF] w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <span className="hidden sm:inline">Bus & Shuttle</span>
                        <span className="sm:hidden">Bus</span>
                      </div>
                    ),
                    value: "bus",
                  },
                  {
                    label: (
                      <div
                        className={`flex items-center justify-center sm:justify-start px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-[#121216] rounded-lg hover:bg-[#F4FFEB] ${
                          activeTab === "hotel" ? "bg-[#F4FFEB]" : "bg-white"
                        }`}
                      >
                        <div className="bg-[#E8FBCC] rounded-full p-1.5 sm:p-2.5">
                          <FaHotel className="text-[#447A11] w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <span className="hidden sm:inline">
                          Hotel & Accommodation
                        </span>
                        <span className="sm:hidden">Hotel</span>
                      </div>
                    ),
                    value: "hotel",
                  },
                  {
                    label: (
                      <div
                        className={`flex items-center justify-center sm:justify-start px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-3 text-xs sm:text-sm md:text-base text-[#121216] rounded-lg hover:bg-[#EBF4FF] ${
                          activeTab === "flight" ? "bg-[#EBF4FF]" : "bg-white"
                        }`}
                      >
                        <div className="bg-[#E1EDFE] rounded-full p-1.5 sm:p-2.5">
                          <MdFlightTakeoff className="text-[#5664E1] w-5 h-5 sm:w-7 sm:h-7" />
                        </div>
                        <span className="">Flight</span>
                      </div>
                    ),
                    value: "flight",
                  },
                ]}
              />
            </div>
            <div className="w-full mb-6 px-4 sm:px-6">
              {activeTab === "bus" && <SearchForm />}
              {activeTab === "hotel" && (
                <p className="text-[#767689] text-base sm:text-lg text-center py-8 sm:py-12">
                  No data
                </p>
              )}
              {activeTab === "flight" && (
                <p className="text-[#767689] text-base sm:text-lg text-center py-8 sm:py-12">
                  No data
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
