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
        <div className="flex flex-col items-center justify-center h-[45vh] py-12 pt-24 bg-linear-to-b from-[#F5F8FF] to-[#DBF5FF] relative"></div>

        <div className="container absolute top-28 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full min-w-2xl bg-white rounded-2xl shadow-lg px-24 py-20">
              <div className="space-y-14 mb-8 text-[#121216] text-2xl font-semibold">
                <div className="">From: {from}</div>
                <div className="">To: {to}</div>
                <div className="">Departure date: {departure}</div>
                {returnDate && (
                  <div className="">Return date: {returnDate}</div>
                )}
                <div className="">No. of passenger {passengers}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
