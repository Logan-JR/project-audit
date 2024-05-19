import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Inscription from "@/models/courses/Inscription";

export const GET = async (request, { params }) => {
  try {
    connectDB();
    const inscriptionFound = await Inscription.findById(params.id);
    if (!inscriptionFound)
      return NextResponse.json(
        {
          message: "Inscription not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(inscriptionFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const PUT = async (request, { params }) => {
  try {
    const data = await request.json();
    const inscriptionUpdate = await Inscription.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(inscriptionUpdate);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const inscriptionDeleted = await Inscription.findByIdAndDelete(params.id);
    if (!inscriptionDeleted)
      return NextResponse.json(
        {
          message: "Inscription not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(inscriptionDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
