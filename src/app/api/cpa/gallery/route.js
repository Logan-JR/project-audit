import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Gallery from "@/models/cpa/Gallery";
import { createFile } from "@/utils/file";
import { parseFormData } from "@/utils/form";

export const GET = async () => {
  connectDB();
  const data = await Gallery.find();
  return NextResponse.json(data);
};

export const POST = async (request) => {
  try {
    const data = await request.formData();
    const parsedData = parseFormData(data);
    parsedData.img = await createFile(parsedData.img[0], "image/gallery");
    const newData = new Gallery(parsedData);
    const saveData = await newData.save();
    return NextResponse.json(saveData);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
