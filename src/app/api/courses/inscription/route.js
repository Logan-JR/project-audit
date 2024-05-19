import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Inscription from "@/models/courses/Inscription";

export const GET = async () => {
  connectDB();
  const inscription = await Inscription.find();
  return NextResponse.json(inscription);
};

export const POST = async (request) => {
  try {
    const data = await request.json();
    const newInscription = new Inscription(data);
    const saveInscription = await newInscription.save();
    return NextResponse.json(saveInscription);
  } catch (error) {
    console.log(error)
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
