"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function SelectLocation() {

  const { data: session } =
    useSession();

  const router =
    useRouter();

  const role =
    (session?.user as any)?.role;

  // Redirect normal admins
  if (
    role &&
    role !== "superadmin"
  ) {

    router.replace(
      `/register/${
        (session?.user as any)
          ?.location
      }`
    );

    return null;

  }

  const locations = [
    "chennai",
    "theni",
    "hyderabad",
    "mumbai",
    "delhi",
    "kolkata",
  ];

  const handleLocationSelect = (
    location: string
  ) => {

    localStorage.setItem(
      "selectedLocation",
      location
    );

    router.push(
      `/register/${location}`
    );

  };

  return (

    <div className="min-h-screen bg-slate-50 relative overflow-hidden">

      {/* Background */}

      <div className="fixed top-0 right-0 w-[450px] h-[450px] bg-purple-300 rounded-full blur-[120px] opacity-20" />

      <div className="fixed bottom-0 left-0 w-[350px] h-[350px] bg-cyan-300 rounded-full blur-[120px] opacity-20" />

      <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">

        {/* Hero */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-[40px] p-10 text-white shadow-2xl">

          <h1 className="text-5xl font-bold">
            Select Location
          </h1>

          <p className="mt-4 text-lg text-indigo-100">
            Choose a region to manage registrations.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {locations.map(
            (location) => (

              <button
                key={location}
                onClick={() =>
                  handleLocationSelect(
                    location
                  )
                }
                className="
                bg-white
                rounded-3xl
                shadow-xl
                p-8
                text-left
                hover:scale-105
                hover:shadow-2xl
                transition-all
                duration-300
                group
                "
              >

                <div className="flex justify-between items-center">

                  <MapPin
                    size={40}
                    className="text-indigo-600"
                  />

                  <ArrowRight
                    size={28}
                    className="
                    text-slate-400
                    group-hover:text-indigo-600
                    group-hover:translate-x-1
                    transition
                    "
                  />

                </div>

                <h2 className="text-3xl font-bold capitalize mt-8">
                  {location}
                </h2>

                <p className="text-slate-500 mt-3">
                  Open Registration Portal
                </p>

              </button>

            )
          )}

        </div>

      </div>

    </div>

  );

}