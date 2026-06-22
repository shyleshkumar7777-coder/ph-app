"use client";

import { useRouter } from "next/navigation";

export default function LocationPage() {
  const router = useRouter();

  const locations = [
    "Chennai",
    "Bangalore",
    "Mumbai",
    "Hyderabad",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[500px]">

        <h1 className="text-4xl font-bold text-center mb-8">
          Select Location
        </h1>

        <div className="grid gap-4">

          {locations.map((location) => (

            <button
              key={location}
              onClick={() =>
                router.push(
                  `/register/${location.toLowerCase()}`
                )
              }
              className="
              p-5
              rounded-2xl
              bg-indigo-600
              text-white
              font-semibold
              hover:scale-105
              transition
              "
            >
              {location}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}