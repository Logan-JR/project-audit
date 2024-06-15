
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

const BACKUP_DIR = path.join(os.homedir(), "Desktop", "MongoBackups");

export async function GET() {
  try {
    const backups = await new Promise((resolve, reject) => {
      fs.readdir(BACKUP_DIR, (err, files) => {
        if (err) {
          return reject(err);
        }
        const backupDetails = files.map((file) => {
          const filePath = path.join(BACKUP_DIR, file);
          const stats = fs.statSync(filePath);
          return {
            name: file,
            date: stats.mtime,
          };
        });
        resolve(backupDetails);
      });
    });

    return NextResponse.json(backups);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
