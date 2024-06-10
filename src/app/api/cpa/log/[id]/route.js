import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Bitacora from "@/models/cpa/Bitacora";

export const GET = async (request, { params }) => {
  try {
    connectDB();
    const logFound = await Bitacora.findById(params.id);
    if (!logFound)
      return NextResponse.json(
        {
          message: "Log not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(logFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
