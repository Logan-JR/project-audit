import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import User from "@/models/cpa/User";
import bcrypt from "bcryptjs";

export const GET = async () => {
  connectDB();
  const users = await User.find();
  return NextResponse.json(users);
};

export const POST = async (request) => {
  try {
    let data = await request.json();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newUser = new User(data);
    const saveUser = await newUser.save();
    return NextResponse.json(saveUser);
  } catch (error) {
    console.log(error)
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
