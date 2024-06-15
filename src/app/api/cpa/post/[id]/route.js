import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Post from "@/models/cpa/Post";
import { createFile } from "@/utils/file";
import { parseFormData } from "@/utils/form";

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
    const data = await request.formData();
    const parsedData = parseFormData(data);
    if (
      typeof parsedData.img[0] !== "string" &&
      typeof parsedData.img[0] !== "undefined"
    ) {
      parsedData.img = await createFile(parsedData.img[0], "/image");
    }
    if (
      typeof parsedData.file[0] !== "string" &&
      typeof parsedData.file[0] !== "undefined"
    ) {
      parsedData.file = await createFile(parsedData.file[0], "/pdf");
    }
    if (typeof parsedData.img[0] === "undefined") parsedData.img = "";
    if (typeof parsedData.file[0] === "undefined") parsedData.file = "";
    const postUpdate = await Post.findByIdAndUpdate(params.id, parsedData, {
      new: true,
    });
    return NextResponse.json(postUpdate);
  } catch (error) {
    console.log(error);
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
