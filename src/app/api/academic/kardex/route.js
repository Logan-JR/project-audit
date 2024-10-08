import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Kardex from "@/models/academic/Kardex";
import { createFile } from "@/utils/file";

export const GET = async () => {
  connectDB();
  const kardexs = await Kardex.find();
  return NextResponse.json(kardexs);
};

export const POST = async (request) => {
  try {
    const data = await request.formData();
    const parseFormData = (formData) => {
      const object = {};
      formData.forEach((value, key) => {
        const keys = key.split("[").map((k) => k.replace("]", ""));
        keys.reduce((acc, k, i) => {
          if (i === keys.length - 1) {
            acc[k] = value;
          } else {
            if (!acc[k]) acc[k] = {};
          }
          return acc[k];
        }, object);
      });
      return object;
    };

    const parsedData = parseFormData(data);
    parsedData.fileKardex = await createFile(parsedData.fileKardex[0], "pdf/kardex");
    const newKardex = new Kardex(parsedData);
    const saveKardex = await newKardex.save();
    return NextResponse.json(saveKardex);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
