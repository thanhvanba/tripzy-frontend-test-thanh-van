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
        <div className="flex flex-col items-center justify-center h-[45vh] py-12 pt-24 bg-linear-to-b from-[#F5F8FF] to-[#DBF5FF] relative">
          <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col gap-2 whitespace-nowrap">
            <h1 className="text-[40px] font-semibold text-[#121216] text-center">
              Travel Smarter, Not Harder
            </h1>
            <p className="text-[18px] text-[#767689] text-center">
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
                className="w-full p-3! bg-white! tabs-home"
                options={[
                  {
                    label: (
                      <div
                        className={`flex items-center justify-start px-4 py-3 gap-3 text-[#121216] rounded-lg hover:bg-[#EBF9FF] ${
                          activeTab === "bus" ? "bg-[#EBF9FF]" : ""
                        }`}
                      >
                        <div className="bg-[#D3F3FF] rounded-full p-2.5">
                          <FaBusAlt className="text-[#19C0FF]" size={28} />
                        </div>
                        Bus & Shuttle
                      </div>
                    ),
                    value: "bus",
                  },
                  {
                    label: (
                      <div
                        className={`flex items-center justify-start px-4 py-3 gap-3 text-[#121216] rounded-lg hover:bg-[#F4FFEB] ${
                          activeTab === "hotel" ? "bg-[#F4FFEB]" : "bg-white"
                        }`}
                      >
                        <div className="bg-[#E8FBCC] rounded-full p-2.5">
                          <FaHotel className="text-[#447A11]" size={28} />
                        </div>
                        Hotel & Accommodation
                      </div>
                    ),
                    value: "hotel",
                  },
                  {
                    label: (
                      <div
                        className={`flex items-center justify-start px-4 py-3 gap-3 text-[#121216] rounded-lg hover:bg-[#EBF4FF] ${
                          activeTab === "flight" ? "bg-[#EBF4FF]" : "bg-white"
                        }`}
                      >
                        <div className="bg-[#E1EDFE] rounded-full p-2.5">
                          <MdFlightTakeoff
                            className="text-[#5664E1]"
                            size={28}
                          />
                        </div>
                        Flight
                      </div>
                    ),
                    value: "flight",
                  },
                ]}
              />
            </div>
            <div className="w-full mb-6">
              {activeTab === "bus" && <SearchForm />}
              {activeTab === "hotel" && (
                <p className="text-[#767689] text-lg text-center py-12">
                  No data
                </p>
              )}
              {activeTab === "flight" && (
                <p className="text-[#767689] text-lg text-center py-12">
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
