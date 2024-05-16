import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Curso from "@/models/courses/Curso";

export const GET = async (request, { params }) => {
  try {
    connectDB();
    const cursoFound = await Curso.findById(params.id);
    if (!cursoFound)
      return NextResponse.json(
        {
          message: "Curso not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(cursoFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const PUT = async (request, { params }) => {
  try {
    const data = await request.json();
    const cursoUpdate = await Curso.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(cursoUpdate);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const cursoDeleted = await Curso.findByIdAndDelete(params.id);
    if (!cursoDeleted)
      return NextResponse.json(
        {
          message: "Curso not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(cursoDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
