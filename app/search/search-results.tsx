"use client";

import { useSearchParams } from "next/navigation";

export default function SearchResults() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "-";
  const to = searchParams.get("to") || "-";
  const departure = searchParams.get("dep") || "-";
  const returnDate = searchParams.get("ret") || null;
  const passengers = searchParams.get("pax") || "1";

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 text-[#121216] text-lg sm:text-xl md:text-2xl font-semibold">
        <div className="">From: {from}</div>
        <div className="">To: {to}</div>
        <div className="">Departure date: {departure}</div>
        {returnDate && <div className="">Return date: {returnDate}</div>}
        <div className="">No. of passenger {passengers}</div>
      </div>
    </div>
  );
}
