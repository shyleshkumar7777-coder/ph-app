"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Users,
  BookOpen,
  Brain,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const COLORS = [
  "#4F46E5",
  "#06B6D4",
  "#F59E0B",
];

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  const [students, setStudents] = useState<any[]>([]);

  const [filteredStudents, setFilteredStudents] =
    useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("Recent Registrations");

  const router = useRouter();

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch("/api/students")
  .then((res) => res.json())
  .then((data) => {
    const todayStudents = data.filter(
      (student: any) => {
        const studentDate = new Date(
          student.createdAt
        );

        return (
          studentDate.toDateString() ===
          new Date().toDateString()
        );
      }
    );

    setStudents(todayStudents);
    setFilteredStudents(todayStudents);
  });
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  

  const courseData = [
    {
      name: "Basic",
      value: stats.basicStudents,
    },
    {
      name: "Advanced",
      value: stats.advancedStudents,
    },
    {
      name: "Psychotherapy",
      value: stats.psychotherapyStudents,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">

      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-300 rounded-full blur-[120px] opacity-20" />

      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-cyan-300 rounded-full blur-[120px] opacity-20" />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">

        {/* HERO */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-[40px] px-10 py-12 text-white shadow-2xl">

          <h1 className="text-5xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-4 text-lg text-indigo-100">
            Monitor student registrations.
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12">

          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<Users size={30} />}
            color="from-blue-500 to-indigo-600"
            onClick={() =>
               router.push("/students/all")
            }
          />

          <StatCard
            title="Basic"
            value={stats.basicStudents}
            icon={<BookOpen size={30} />}
            color="from-green-500 to-emerald-600"
            onClick={() =>
              router.push("/students/basic")
            }
          />

          <StatCard
            title="Advanced"
            value={stats.advancedStudents}
            icon={<BookOpen size={30} />}
            color="from-pink-500 to-purple-600"
            onClick={() =>
              router.push("/students/advanced")
            }
          />

          <StatCard
            title="Psychotherapy"
            value={stats.psychotherapyStudents}
            icon={<Brain size={30} />}
            color="from-orange-500 to-yellow-500"
            onClick={() =>
              router.push("/students/psychotherapy")
            }
          />

        </div>

        {/* SUMMARY + CHART */}

        <div className="grid lg:grid-cols-3 gap-8 mt-12">

          <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-xl">

            <h2 className="text-3xl font-bold mb-8">
              Registration Summary
            </h2>

            <div className="grid grid-cols-3 gap-3 md:gap-6">

              <MiniCard
                title="Today"
                value={
                  stats.todayRegistrations
                }
              />

              <MiniCard
                title="This Week"
                value={
                  stats.weekRegistrations
                }
              />

              <MiniCard
                title="This Month"
                value={
                  stats.monthRegistrations
                }
              />

            </div>

          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-xl">

            <h2 className="text-3xl font-bold mb-8">
              Course Distribution
            </h2>

            <div className="h-[320px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={courseData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                  >

                  {courseData.map(
                  (_entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                  )
                  )}

                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />  

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* FILTERED STUDENTS */}

        <div className="bg-white rounded-[32px] p-8 shadow-xl mt-12">

          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory}
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

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

                </tr>

              </thead>

              <tbody>

                {filteredStudents.map(
                  (student) => (
                    <tr
                      key={student._id}
                      className="border-b hover:bg-slate-50"
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
                          "Basic"}

                        {student.advanced &&
                          "Advanced"}

                        {student.psychotherapy &&
                          "Psychotherapy"}

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
  onClick,
}: any) {
  return (
    <div
      onClick={onClick}
      className={`
      cursor-pointer
      bg-gradient-to-r ${color}
      rounded-3xl
     text-white
      p-5 md:p-8
      shadow-xl
      hover:-translate-y-2
      transition-all duration-300
`}
    >

      <div className="flex justify-between">

        <div>

          <p className="text-sm md:text-base">
            {title}
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-2 md:mt-4">
            {value}
          </h2>

        </div>

        <div className="bg-white/20 p-2 md:p-4 rounded-2xl">
          {icon}
        </div>

      </div>

      <div className="flex gap-2 mt-4 md:mt-8 text-xs md:text-base">

        <ArrowUpRight />

        <span>Click to View</span>

      </div>

    </div>
  );
}

function MiniCard({
  title,
  value,
}: any) {
  return (
    <div className="bg-slate-100 rounded-2xl md:rounded-3xl p-4 md:p-8">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-xs md:text-base text-slate-500">
              {title}
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <Calendar
            size={20}
            className="md:w-8 md:h-8 text-indigo-600"
        />

      </div>

    </div>
  );
}