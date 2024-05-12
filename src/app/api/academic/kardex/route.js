import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Kardex from "@/models/academic/Kardex";

export const GET = async () => {
  connectDB();
  const kardexs = await Kardex.find();
  return NextResponse.json(kardexs);
};

export const POST = async (request) => {
  try {
    const data = await request.json();
    const newKardex = new Kardex(data);
    const saveKardex = await newKardex.save();
    return NextResponse.json(saveKardex);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
