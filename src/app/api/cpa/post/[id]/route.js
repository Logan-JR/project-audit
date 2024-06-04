import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Post from "@/models/cpa/Post";

export const GET = async (request, { params }) => {
  try {
    connectDB();
    const postFound = await Post.findById(params.id);
    if (!postFound)
      return NextResponse.json(
        {
          message: "Post not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(postFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const PUT = async (request, { params }) => {
  try {
    const data = await request.json();
    const postUpdate = await Post.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(postUpdate);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const postDeleted = await Post.findByIdAndDelete(params.id);
    if (!postDeleted)
      return NextResponse.json(
        {
          message: "Post not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(postDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
