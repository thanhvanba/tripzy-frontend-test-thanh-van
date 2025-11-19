"use client";

import { useSearchParams } from "next/navigation";
import Header from "../components/header";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "-";
  const to = searchParams.get("to") || "-";
  const departure = searchParams.get("dep") || "-";
  const returnDate = searchParams.get("ret") || null;
  const passengers = searchParams.get("pax") || "1";

  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative">
        <div className="flex flex-col items-center justify-center h-[45vh] py-8 md:py-12 pt-20 md:pt-24 bg-linear-to-b from-[#F5F8FF] to-[#DBF5FF] relative"></div>

        <div className="container absolute top-1/3 md:top-28 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full bg-white rounded-2xl shadow-lg px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
              <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 text-[#121216] text-lg sm:text-xl md:text-2xl font-semibold">
                <div className="">
                  <span className="text-xs md:text-sm text-[#65686F] font-medium block mb-1">
                    From
                  </span>
                  {from}
                </div>
                <div className="">
                  <span className="text-xs md:text-sm text-[#65686F] font-medium block mb-1">
                    To
                  </span>
                  {to}
                </div>
                <div className="">
                  <span className="text-xs md:text-sm text-[#65686F] font-medium block mb-1">
                    Departure Date
                  </span>
                  {departure}
                </div>
                {returnDate && (
                  <div className="">
                    <span className="text-xs md:text-sm text-[#65686F] font-medium block mb-1">
                      Return Date
                    </span>
                    {returnDate}
                  </div>
                )}
                <div className="">
                  <span className="text-xs md:text-sm text-[#65686F] font-medium block mb-1">
                    No. of Passengers
                  </span>
                  {passengers}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
