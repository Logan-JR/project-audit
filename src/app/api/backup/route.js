import { NextResponse } from "next/server";
import { exec } from "child_process";
import os from "os";
import path from "path";

const MONGODB_URI = process.env.MONGODB_URL;
const BACKUP_DIR = path.join(os.homedir(), "Desktop", "MongoBackups");

export async function POST() {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}_${String(
    date.getHours()
  ).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}-${String(
    date.getSeconds()
  ).padStart(2, "0")}`;
  const backupPath = path.join(BACKUP_DIR, `backup_${formattedDate}`);

  const command = `mongodump --uri ${MONGODB_URI} --out ${backupPath}`;

  try {
    await new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el comando: ${error.message}`);
          return reject(error);
        }
        if (
          stderr &&
          (stderr.toLowerCase().includes("error") ||
            stderr.toLowerCase().includes("failed"))
        ) {
          console.error(`Error en stderr: ${stderr}`);
          return reject(new Error(stderr));
        }
        console.log(`stdout: ${stdout}`);
        resolve();
      });
    });

    return NextResponse.json({
      message: "Copia de seguridad realizada con éxito.",
      backupPath,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
