"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Navbar from "../../components/navbar";

export default function Home() {
  const router = useRouter();

  const params = useParams();

  const location = params.location as string;

  const [formData, setFormData] = useState({
    wphId: "",
    name: "",
    email: "",
    basic: false,
    advanced: false,
    psychotherapy: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData , location,})
      });

      const data = await response.json();

      if (data.success) {
        alert("Registration Successful");

        setFormData({
          wphId: "",
          name: "",
          email: "",
          basic: false,
          advanced: false,
          psychotherapy: false,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center px-4 py-8">

          {/* Background Blobs */}

          <div className="fixed top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-300 rounded-full blur-[100px] md:blur-[120px] opacity-20" />

          <div className="fixed bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-cyan-300 rounded-full blur-[100px] md:blur-[120px] opacity-20" />

          <div className="w-full max-w-2xl relative z-10">

            {/* Hero */}

            <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-[28px] md:rounded-[40px] px-6 md:px-10 py-8 md:py-12 text-white shadow-2xl mb-6 md:mb-8">

              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-center">
                WPH Registration
              <br />
                Portal 
              </h1>

              <p className="mt-3 text-sm md:text-lg text-indigo-100 font-bold leading-tight text-center">
                Register students and manage enrollments.
              </p>
            </div>

            {/* Form Card */}

            <div className="bg-white/70 backdrop-blur-xl rounded-[28px] md:rounded-[32px] p-6 md:p-10 shadow-2xl border border-white">

              <form
                onSubmit={handleSubmit}
                className="space-y-5 md:space-y-6"
              >

                {/* WPH ID */}

                <div>
                  <p className="block mb-2 font-medium text-slate-700 text-sm md:text-base">
                    Location: {location.toUpperCase()}

                  </p>

                  <label className="block mb-2 font-medium text-slate-700 text-sm md:text-base">
                    WPH ID
                  </label>

                  <input
                    type="text"
                    name="wphId"
                    value={formData.wphId}
                    onChange={handleChange}
                    placeholder="Enter WPH ID"
                    required
                    className="w-full p-3 md:p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                </div>

                {/* Name */}

                <div>

                  <label className="block mb-2 font-medium text-slate-700 text-sm md:text-base">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    required
                    className="w-full p-3 md:p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                </div>

                {/* Email */}

                <div>

                  <label className="block mb-2 font-medium text-slate-700 text-sm md:text-base">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                    className="w-full p-3 md:p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                </div>

                {/* Courses */}

                <div>

                  <h2 className="text-lg md:text-xl font-semibold mb-4">
                    Select Courses
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                    <label className="flex items-center gap-3 bg-slate-100 p-4 md:p-5 rounded-2xl cursor-pointer hover:bg-slate-200 transition">

                      <input
                        type="checkbox"
                        name="basic"
                        checked={formData.basic}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />

                      <span className="font-medium">
                        Basic
                      </span>

                    </label>

                    <label className="flex items-center gap-3 bg-slate-100 p-4 md:p-5 rounded-2xl cursor-pointer hover:bg-slate-200 transition">

                      <input
                        type="checkbox"
                        name="advanced"
                        checked={formData.advanced}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />

                      <span className="font-medium">
                        Advanced
                      </span>

                    </label>

                    <label className="flex items-center gap-3 bg-slate-100 p-4 md:p-5 rounded-2xl cursor-pointer hover:bg-slate-200 transition">

                      <input
                        type="checkbox"
                        name="psychotherapy"
                        checked={formData.psychotherapy}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />

                      <span className="font-medium">
                        Psychotherapy
                      </span>

                    </label>

                  </div>

                </div>

                {/* Buttons */}

                <div className="flex flex-col md:flex-row gap-4 pt-2">

                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 md:py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
                  >
                    Submit Registration
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      router.push("/dashboard")
                    }
                    className="flex-1 bg-white border border-slate-300 py-3 md:py-4 rounded-2xl font-semibold hover:bg-slate-100 transition"
                  >
                    View Dashboard
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
  );
}