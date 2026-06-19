"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function StudentsPage() {
  const params = useParams();

  const category = params.category as string;

  const [students, setStudents] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch("/api/students")
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
  }, [category]);

  if (loading) {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero Skeleton */}

        <div className="animate-pulse bg-slate-200 rounded-[40px] h-52"></div>

        {/* Cards Skeleton */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse bg-slate-200 rounded-3xl h-40"
            />
          ))}

        </div>

        {/* Chart Skeleton */}

        <div className="grid lg:grid-cols-3 gap-6 mt-10">

          <div className="animate-pulse bg-slate-200 rounded-3xl h-[350px] lg:col-span-2"></div>

          <div className="animate-pulse bg-slate-200 rounded-3xl h-[350px]"></div>

        </div>

      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-5xl font-bold capitalize">
              {category} Students
            </h1>

            <p className="text-slate-500 mt-3">
              Total Students:
              {" "}
              {students.length}
            </p>

          </div>

          <Link
            href="/dashboard"
            className="
            bg-indigo-600
            text-white
            px-6
            py-3
            rounded-2xl
            "
          >
            Back to Dashboard
          </Link>

        </div>

        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left p-5">
                  WPH ID
                </th>

                <th className="text-left p-5">
                  Name
                </th>

                <th className="text-left p-5">
                  Email
                </th>

                <th className="text-left p-5">
                  Course
                </th>

                <th className="text-left p-5">
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

                      <td className="p-5">
                        {student.wphId}
                      </td>

                      <td className="p-5">
                        {student.name}
                      </td>

                      <td className="p-5">
                        {student.email}
                      </td>

                      <td className="p-5">

                        {student.basic &&
                          "Basic"}

                        {student.advanced &&
                          "Advanced"}

                        {student.psychotherapy &&
                          "Psychotherapy"}

                      </td>

                      <td className="p-5">

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
                    p-12
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
  );
}