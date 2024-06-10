import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Post from "@/models/cpa/Post";
import { createFile } from "@/utils/file";

export const GET = async () => {
  connectDB();
  const post = await Post.find();
  return NextResponse.json(post);
};

export const POST = async (request) => {
  try {
    const data = await request.formData();
    const newData = Object.fromEntries(data.entries());
    const { title, detail, img, file } = newData;
    let imageName = "";
    if (img !== "undefined") {
      imageName = await createFile(img);
      newData.img = imageName;
    }
    let fileName = "";
    if (file !== "undefined") {
      fileName = await createFile(file, false);
      newData.file = fileName;
    }
    const newPost = new Post({
      title,
      detail,
      img: imageName,
      file: fileName,
    });
    const savePost = await newPost.save();
    return NextResponse.json(savePost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
