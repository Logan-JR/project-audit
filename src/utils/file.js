import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export const createFile = async (file, ruta) => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuid()}.${fileExtension}`;
    const filePath = path.join(process.cwd(), "/public", ruta, fileName);
    await writeFile(filePath, buffer);
    return fileName;
  } catch (error) {
    console.log(error);
  }
};
