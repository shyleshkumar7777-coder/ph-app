"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
        body: JSON.stringify(formData),
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
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center p-6">

      {/* Background Blobs */}

      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-300 rounded-full blur-[120px] opacity-20" />

      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-cyan-300 rounded-full blur-[120px] opacity-20" />

      <div className="w-full max-w-2xl relative z-10">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-[32px] p-8 text-white shadow-2xl mb-8">

          <h1 className="text-4xl font-bold">
            WPH Registration Portal
          </h1>

          <p className="mt-3 text-indigo-100">
            Register students and manage enrollments.
          </p>

        </div>

        {/* Form Card */}

        <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-10 shadow-2xl border border-white">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block mb-2 font-medium text-slate-700">
                WPH ID
              </label>

              <input
                type="text"
                name="wphId"
                value={formData.wphId}
                onChange={handleChange}
                placeholder="Enter WPH ID"
                required
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium text-slate-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Courses */}

            <div>

              <h2 className="text-xl font-semibold mb-4">
                Select Courses
              </h2>

              <div className="grid md:grid-cols-3 gap-4">

                <label className="flex items-center gap-3 bg-slate-100 p-5 rounded-2xl cursor-pointer hover:bg-slate-200 transition">

                  <input
                    type="checkbox"
                    name="basic"
                    checked={formData.basic}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />

                  <span>Basic</span>

                </label>

                <label className="flex items-center gap-3 bg-slate-100 p-5 rounded-2xl cursor-pointer hover:bg-slate-200 transition">

                  <input
                    type="checkbox"
                    name="advanced"
                    checked={formData.advanced}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />

                  <span>Advanced</span>

                </label>

                <label className="flex items-center gap-3 bg-slate-100 p-5 rounded-2xl cursor-pointer hover:bg-slate-200 transition">

                  <input
                    type="checkbox"
                    name="psychotherapy"
                    checked={formData.psychotherapy}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />

                  <span>Psychotherapy</span>

                </label>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-col md:flex-row gap-4 pt-4">

              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
              >
                Submit Registration
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push("/dashboard")
                }
                className="flex-1 bg-white border border-slate-300 py-4 rounded-2xl font-semibold hover:bg-slate-100 transition"
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