import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Student from "../../../models/student";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/* -------------------- GET SINGLE STUDENT -------------------- */

export async function GET(
  request: Request,
  { params }: Params
) {

  try {

    await connectDB();

    const { id } = await params;

    const student =
      await Student.findById(id);

    if (!student) {

      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        {
          status: 404,
        }
      );

    }

    return NextResponse.json(student);

  }

  catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching student",
      },
      {
        status: 500,
      }
    );

  }

}

/* -------------------- UPDATE STUDENT -------------------- */

export async function PUT(
  request: Request,
  { params }: Params
) {

  try {

    await connectDB();

    const { id } = await params;

    const body =
      await request.json();

    const updatedStudent =
      await Student.findByIdAndUpdate(

        id,

        {
          wphId: body.wphId,
          name: body.name,
          email: body.email,
          course: body.course,
          location: body.location,
          date: body.date,
        },

        {
          new: true,
          runValidators: true,
        }

      );

    if (!updatedStudent) {

      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        {
          status: 404,
        }
      );

    }

    return NextResponse.json({

      success: true,

      message:
        "Student updated successfully",

      student:
        updatedStudent,

    });

  }

  catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error updating student",
      },
      {
        status: 500,
      }
    );

  }

}