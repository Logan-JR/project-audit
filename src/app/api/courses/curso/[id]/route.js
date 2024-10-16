import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Curso from "@/models/courses/Curso";
import { parseFormData } from "@/utils/form";
import { createFile } from "@/utils/file";

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
    const data = await request.formData();
    const parsedData = parseFormData(data);

    if (typeof parsedData.flyer !== "string")
      parsedData.flyer = await createFile(parsedData.flyer[0], "image/course");

    const cursoUpdate = await Curso.findByIdAndUpdate(params.id, parsedData, {
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
