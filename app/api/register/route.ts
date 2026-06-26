import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Student from "../../models/student";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await connectDB();

    const student = await Student.create({
      wphId: body.wphId,
      name: body.name,
      email: body.email,
      course: body.course,
      date: body.date,
      location: body.location
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration Successful",
        student,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}