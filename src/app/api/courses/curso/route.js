import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Curso from "@/models/courses/Curso";
import { parseFormData } from "@/utils/form";
import { createFile } from "@/utils/file";

export const GET = async () => {
  connectDB();
  const curso = await Curso.find();
  return NextResponse.json(curso);
};

export const POST = async (request) => {
  try {
    const data = await request.formData();
    const parsedData = parseFormData(data);
    parsedData.flyer = await createFile(parsedData.flyer[0], "image/course");
    const newCurso = new Curso(parsedData);
    const saveCurso = await newCurso.save();
    return NextResponse.json(saveCurso);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
