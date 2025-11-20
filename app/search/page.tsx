import { Suspense } from "react";
import Header from "../components/header";
import SearchResults from "./search-results";

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative">
        <div className="flex flex-col items-center justify-center h-[45vh] py-8 md:py-12 pt-20 md:pt-24 bg-linear-to-b from-[#F5F8FF] to-[#DBF5FF] relative"></div>

        <div className="container absolute top-1/3 md:top-28 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center justify-center w-full">
            <Suspense
              fallback={
                <div className="w-full bg-white rounded-2xl shadow-lg px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
                  Loading search results...
                </div>
              }
            >
              <SearchResults />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
