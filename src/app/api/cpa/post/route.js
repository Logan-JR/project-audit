import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Post from "@/models/cpa/Post";
import { createFile } from "@/utils/file";
import { parseFormData } from "@/utils/form";

export const GET = async () => {
  connectDB();
  const post = await Post.find();
  return NextResponse.json(post);
};

export const POST = async (request) => {
  try {
    const data = await request.formData();
    const parsedData = parseFormData(data);
    parsedData.img = await createFile(parsedData.img[0], "image");
    if (!parsedData.file[0]) parsedData.file = "";
    else {
      parsedData.file = await createFile(parsedData.file[0], "pdf");
    }
    const newPost = new Post(parsedData);
    const savePost = await newPost.save();
    return NextResponse.json(savePost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
