"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";

export default function StudentsPage() {
  const params = useParams();

  const searchParams =
    useSearchParams();

  const category =
    params.category as string;

  const location =
    searchParams.get("location");

  const [students, setStudents] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      `/api/students?location=${location}`
    )
      .then((res) => res.json())
      .then((data) => {

        let filtered = data;

        if (category === "basic") {

          filtered = data.filter(
            (student: any) =>
              student.basic
          );

        }

        else if (
          category === "advanced"
        ) {

          filtered = data.filter(
            (student: any) =>
              student.advanced
          );

        }

        else if (
          category ===
          "psychotherapy"
        ) {

          filtered = data.filter(
            (student: any) =>
              student.psychotherapy
          );

        }

        setStudents(filtered);
        setLoading(false);

      });

  }, [category, location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">

          <div className="animate-pulse bg-slate-200 rounded-[40px] h-52"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse bg-slate-200 rounded-3xl h-40"
              />
            ))}

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">

      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-300 rounded-full blur-[120px] opacity-20" />

      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-cyan-300 rounded-full blur-[120px] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 relative z-10">

        {/* HERO */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-[40px] px-6 md:px-10 py-8 md:py-12 text-white shadow-2xl">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div>

              <h1 className="text-3xl md:text-5xl font-bold capitalize text-center md:text-left">
                {category} Students
              </h1>

              <p className="mt-4 text-base md:text-lg text-indigo-100 text-center md:text-left">
                📍 {location.toUpperCase()}
              </p>


            </div>

            <Link
              href={`/dashboard?location=${location}`}
              className="
              bg-white
              text-indigo-600
              px-6
              py-3
              rounded-2xl
              font-semibold
              hover:scale-105
              transition
              "
            >
              Back to Dashboard
            </Link>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-[32px] p-5 md:p-8 shadow-xl mt-12">

          <h2 className="text-2xl md:text-3xl font-bold mb-8 capitalize">
            {category} Student List
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead>

                <tr className="border-b">

                  <th className="p-4 text-left">
                    WPH ID
                  </th>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Course
                  </th>

                  <th className="p-4 text-left">
                    Registered
                  </th>

                </tr>

              </thead>

              <tbody>

                {students.length > 0 ? (

                  students.map(
                    (student: any) => (

                      <tr
                        key={student._id}
                        className="
                        border-b
                        hover:bg-slate-50
                        "
                      >

                        <td className="p-4">
                          {student.wphId}
                        </td>

                        <td className="p-4">
                          {student.name}
                        </td>

                        <td className="p-4">
                          {student.email}
                        </td>

                        <td className="p-4">

                          {student.basic &&
                            "Basic "}

                          {student.advanced &&
                            "Advanced "}

                          {student.psychotherapy &&
                            "Psychotherapy"}

                        </td>

                        <td className="p-4">

                          {new Date(
                            student.createdAt
                          ).toLocaleDateString()}

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={5}
                      className="
                      text-center
                      p-10
                      text-slate-500
                      "
                    >
                      No students found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}