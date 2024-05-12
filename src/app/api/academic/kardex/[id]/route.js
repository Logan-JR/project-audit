import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Kardex from "@/models/academic/Kardex";

export const GET = async (request, { params }) => {
  try {
    connectDB();
    const kardexFound = await Kardex.findById(params.id);
    if (!kardexFound)
      return NextResponse.json(
        {
          message: "Kardex not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(kardexFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const PUT = async (request, { params }) => {
  try {
    const data = await request.json();
    const kardexUpdate = await Kardex.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(kardexUpdate);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const kardexDeleted = await Kardex.findByIdAndDelete(params.id);
    if (!kardexDeleted)
      return NextResponse.json(
        {
          message: "Kardex not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(kardexDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
