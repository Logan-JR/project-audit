import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Curso from "@/models/courses/Curso";

export const GET = async () => {
  connectDB();
  const curso = await Curso.find();
  return NextResponse.json(curso);
};

export const POST = async (request) => {
  try {
    const data = await request.json();
    const newCurso = new Curso(data);
    const saveCurso = await newCurso.save();
    return NextResponse.json(saveCurso);
  } catch (error) {
    console.log(error)
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
