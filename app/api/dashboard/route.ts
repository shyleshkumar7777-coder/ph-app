import { NextResponse } from "next/server";
import Student from "../../models/student";
import { connectDB } from "../../lib/mongodb";

export async function GET(
  request: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const location =
      searchParams.get("location");

    const students =
      await Student.find(
        location
          ? { location }
          : {}
      ).sort({
        createdAt: -1,
      });

    const totalStudents =
      students.length;

    const basicStudents =
      students.filter(
        (s) => s.basic
      ).length;

    const advancedStudents =
      students.filter(
        (s) => s.advanced
      ).length;

    const psychotherapyStudents =
      students.filter(
        (s) => s.psychotherapy
      ).length;

    const now = new Date();

    const recentRegistrations =
      students.filter((s) => {
        const d = new Date(
          s.createdAt
        );

        return (
          d.toDateString() ===
          now.toDateString()
        );
      }).length;

    const todayRegistrations =
        students.filter((s) => {
            const d = new Date(
            s.createdAt
            );

            return (
            d.toDateString() ===
            now.toDateString()
            );
        }).length;

    const weekAgo = new Date();

    weekAgo.setDate(
      now.getDate() - 7
    );

    const weekRegistrations =
      students.filter(
        (s) =>
          new Date(
            s.createdAt
          ) >= weekAgo
      ).length;

    const monthAgo =
      new Date();

    monthAgo.setMonth(
      now.getMonth() - 1
    );

    const monthRegistrations =
      students.filter(
        (s) =>
          new Date(
            s.createdAt
          ) >= monthAgo
      ).length;

    return NextResponse.json({
      totalStudents,
      basicStudents,
      advancedStudents,
      psychotherapyStudents,
      recentRegistrations,
      todayRegistrations,
      weekRegistrations,
      monthRegistrations,
      recentStudents:
        students.slice(0, 10),
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}