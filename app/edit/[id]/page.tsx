"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/navbar";

export default function EditStudent() {

  const router = useRouter();

  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      wphId: "",
      name: "",
      email: "",
      course: "",
      location: "",
      date: "",
    });

  useEffect(() => {

    async function loadStudent() {

      try {

        const res =
          await fetch(`/api/students/${id}`);

        const data =
          await res.json();

        setFormData({
          wphId: data.wphId,
          name: data.name,
          email: data.email,
          course: data.course,
          location: data.location,
          date: data.date
            ? data.date.split("T")[0]
            : "",
        });

      }

      catch (err) {

        console.log(err);

        alert("Failed to load student.");

      }

      finally {

        setLoading(false);

      }

    }

    loadStudent();

  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const res =
        await fetch(
          `/api/students/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              formData
            ),
          }
        );

      const data =
        await res.json();

      if (data.success) {

        alert(
          "Student Updated Successfully"
        );

        router.back();

      }

      else {

        alert(data.message);

      }

    }

    catch (err) {

      console.log(err);

      alert(
        "Something went wrong."
      );

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Hero */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-[40px] p-10 text-white shadow-2xl">

          <h1 className="text-4xl font-bold">

            Edit Student

          </h1>

          <p className="mt-3 text-indigo-100">

            Update student details.

          </p>

        </div>

        {/* Form */}

        <div className="bg-white rounded-[32px] shadow-xl p-8 mt-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="font-medium">

                WPH ID

              </label>

              <input
                type="text"
                name="wphId"
                value={formData.wphId}
                disabled
                className="w-full mt-2 p-4 rounded-2xl border bg-slate-100"
              />

            </div>

            <div>

              <label className="font-medium">

                Name

              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                disabled
                className="w-full mt-2 p-4 rounded-2xl border bg-slate-100"
              />

            </div>

            <div>

              <label className="font-medium">

                Email

              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full mt-2 p-4 rounded-2xl border bg-slate-100"
              />

            </div>

            <div>

              <label className="font-medium">

                Location

              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                disabled
                className="w-full mt-2 p-4 rounded-2xl border bg-slate-100"
              />

            </div>

            <div>

              <label className="font-medium">

                Registration Date

              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                className="w-full mt-2 p-4 rounded-2xl border bg-slate-100"
              />

            </div>

            {/* Course */}

            <div>

              <h2 className="text-xl font-semibold mb-4">

                Course

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {[
                  "basic",
                  "advanced",
                  "psychotherapy",
                ].map((course) => (

                  <label
                    key={course}
                    className="
                    flex
                    items-center
                    gap-3
                    bg-slate-100
                    p-4
                    rounded-2xl
                    cursor-pointer
                    hover:bg-slate-200
                    "
                  >

                    <input
                      type="radio"
                      name="course"
                      value={course}
                      checked={
                        formData.course ===
                        course
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <span className="capitalize">

                      {course}

                    </span>

                  </label>

                ))}

              </div>

            </div>

            <button
              type="submit"
              className="
              w-full
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              text-white
              py-4
              rounded-2xl
              font-semibold
              hover:scale-[1.02]
              transition
              "
            >

              Update Student

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}