import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import User from "@/models/cpa/User";

export const GET = async () => {
  connectDB();
  const users = await User.find();
  return NextResponse.json(users);
};

export const POST = async (request) => {
  try {
    const data = await request.json();
    const newUser = new User(data);
    const saveUser = await newUser.save();
    return NextResponse.json(saveUser);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
