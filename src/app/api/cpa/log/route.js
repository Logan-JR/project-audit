import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Log from "@/models/cpa/Log";

export const GET = async () => {
  connectDB();
  const logs = await Log.find();
  return NextResponse.json(logs);
};

export const POST = async (request) => {
  try {
    const data = await request.json();
    const newLog = new Log(data);
    const saveLog = await newLog.save();
    return NextResponse.json(saveLog);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
