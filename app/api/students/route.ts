import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Student from "../../models/student";

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

    return NextResponse.json(
      students
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message:
          "Error fetching students",
      },
      {
        status: 500,
      }
    );

  }
}