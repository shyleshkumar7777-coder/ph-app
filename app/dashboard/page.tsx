import DashboardClient from "./DashboardClient";

async function getDashboardData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

async function getStudents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/students`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function DashboardPage() {
  const stats = await getDashboardData();
  const students = await getStudents();

  return (
    <DashboardClient
      stats={stats}
      students={students}
    />
  );
}