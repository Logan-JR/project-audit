import { NextResponse } from "next/server";
import { connectDB } from "@/libs/database";
import Kardex from "@/models/academic/Kardex";
import { createFile } from "@/utils/file";

export const GET = async (request, { params }) => {
  try {
    connectDB();
    const kardexFound = await Kardex.findById(params.id);
    if (!kardexFound)
      return NextResponse.json(
        {
          message: "Kardex not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(kardexFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const PUT = async (request, { params }) => {
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
    if (typeof parsedData.fileKardex !== "string") {
      parsedData.fileKardex = await createFile(parsedData.fileKardex[0], 'pdf/kardex');
    }
    const kardexUpdate = await Kardex.findByIdAndUpdate(params.id, parsedData, {
      new: true,
    });
    return NextResponse.json(kardexUpdate);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const kardexDeleted = await Kardex.findByIdAndDelete(params.id);
    if (!kardexDeleted)
      return NextResponse.json(
        {
          message: "Kardex not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(kardexDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
