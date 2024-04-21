import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import User from "@/models/cpa/User";

export const GET = async (request, { params }) => {
  try {
    connectDB();
    const userFound = await User.findById(params.id);
    if (!userFound)
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(userFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const PUT = async (request, { params }) => {
  try {
    const data = await request.json();
    const userUpdate = await User.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(userUpdate);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const userDeleted = await User.findByIdAndDelete(params.id);
    if (!userDeleted)
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(userDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
