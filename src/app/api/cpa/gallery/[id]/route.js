import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Gallery from "@/models/cpa/Gallery";
import { createFile } from "@/utils/file";
import { parseFormData } from "@/utils/form";

export const GET = async (request, { params }) => {
  try {
    connectDB();
    const postFound = await Gallery.findById(params.id);
    if (!postFound)
      return NextResponse.json(
        {
          message: "Image not found",
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
      parsedData.img = await createFile(parsedData.img[0], "image/gallery");
    }
    if (typeof parsedData.img[0] === "undefined") parsedData.img = "";
    const postUpdate = await Gallery.findByIdAndUpdate(params.id, parsedData, {
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
    const postDeleted = await Gallery.findByIdAndDelete(params.id);
    if (!postDeleted)
      return NextResponse.json(
        {
          message: "Image not found",
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
