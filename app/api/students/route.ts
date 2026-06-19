import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Student from "../../models/student";

export async function GET() {
  try {
    await connectDB();

    const students = await Student.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching students" },
      { status: 500 }
    );
  }
}