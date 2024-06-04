import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Post from "@/models/cpa/Post";

export const GET = async () => {
  connectDB();
  const post = await Post.find();
  return NextResponse.json(post);
};

export const POST = async (request) => {
  try {
    const data = await request.json();
    const newPost = new Post(data);
    const savePost = await newPost.save();
    return NextResponse.json(savePost);
  } catch (error) {
    console.log(error)
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
