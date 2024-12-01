import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { connectDB } from "@/libs/database";
import Inscription from "@/models/courses/Inscription";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    connectDB();
    const data = await Inscription.findById(id);
    if (!data)
      return NextResponse.json(
        {
          message: "Inscription not found",
        },
        {
          status: 404,
        }
      );
    const doc = new PDFDocument({
      size: "letter",
      margin: 50,
      font: path.resolve("./public/fonts/Helvetica.ttf"),
    });
    const buffers = [];

    doc.on("data", (buffer) => {
      buffers.push(buffer);
    });

    const logoPath = path.resolve("./public/audit-04.png"); // Ruta a tu logo
    let logoHeight = 50;
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 50, { width: logoHeight });
    }

    doc
      .fontSize(12)
      .text("Carrera Auditoría-Contaduría Pública", 110, 50, { align: "left" })
      .text("Potosí - Bolivia", 110, 65, { align: "left" });

    const titleY = 110;
    doc
      .fontSize(16)
      .font(path.resolve("./public/fonts/Helvetica-Bold.ttf"))
      .text("Recibo de Inscripción", {
        align: "center",
        underline: true,
        y: titleY,
      });

    const participantDetailsY = titleY + 30;
    doc
      .fontSize(12)
      .font("Helvetica")
      .text(
        `Nombre: ${data.nombre} ${data.paterno} ${data.materno || ""}`,
        50,
        participantDetailsY
      )
      .text(`CI: ${data.ci}`, 50, participantDetailsY + 15)
      .text(
        `Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        )}`,
        50,
        participantDetailsY + 30
      );

    const tableTop = 200;
    const rowHeight = 20;
    const columnWidths = {
      cantidad: 50,
      descripcion: 250,
      precioUnitario: 100,
      subtotal: 100,
    };

    doc
      .moveTo(50, tableTop - 10)
      .lineTo(550, tableTop - 10)
      .stroke();

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .text("Cantidad", 50, tableTop, {
        width: columnWidths.cantidad,
        align: "center",
      })
      .text("Descripción", 50 + columnWidths.cantidad, tableTop, {
        width: columnWidths.descripcion,
        align: "center",
      })
      .text(
        "Precio Unitario",
        50 + columnWidths.cantidad + columnWidths.descripcion,
        tableTop,
        { width: columnWidths.precioUnitario, align: "center" }
      )
      .text(
        "Subtotal",
        50 +
          columnWidths.cantidad +
          columnWidths.descripcion +
          columnWidths.precioUnitario,
        tableTop,
        { width: columnWidths.subtotal, align: "center" }
      );

    const courseDescription = `${data.curso.title} - ${data.curso.detail}`;
    const descriptionOptions = {
      width: columnWidths.descripcion,
      align: "center",
      height: rowHeight,
      ellipsis: true,
    };

    doc
      .font("Helvetica")
      .fontSize(10)
      .text("1", 50, tableTop + rowHeight, {
        width: columnWidths.cantidad,
        align: "center",
      })
      .text(
        courseDescription,
        50 + columnWidths.cantidad,
        tableTop + rowHeight,
        descriptionOptions
      )
      .text(
        `Bs. ${data.curso.costo}`,
        50 + columnWidths.cantidad + columnWidths.descripcion,
        tableTop + rowHeight,
        {
          width: columnWidths.precioUnitario,
          align: "center",
        }
      )
      .text(
        `Bs. ${data.curso.costo}`,
        50 +
          columnWidths.cantidad +
          columnWidths.descripcion +
          columnWidths.precioUnitario,
        tableTop + rowHeight,
        {
          width: columnWidths.subtotal,
          align: "center",
        }
      );

    const separatorY = tableTop + 2 * rowHeight + 20;

    doc.moveTo(50, separatorY).lineTo(550, separatorY).stroke();

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .text("Total: Bs. " + data.curso.costo, 450, separatorY + 10, {
        width: 100,
        align: "center",
      });

    const signatureY = separatorY + 100;

    doc
      .font("Helvetica")
      .moveTo(50, signatureY - 10)
      .lineTo(200, signatureY - 10)
      .dash(3, { space: 3 })
      .stroke()
      .undash()
      .text("Entregue Conforme", 50, signatureY, {
        align: "center",
        width: 150,
      });

    doc
      .moveTo(400, signatureY - 10)
      .lineTo(550, signatureY - 10)
      .dash(3, { space: 3 })
      .stroke()
      .undash()
      .text("Recibí Conforme", 400, signatureY, {
        align: "center",
        width: 150,
      });

    doc.end();
    return new Promise((resolve) => {
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        const response = new NextResponse(pdfBuffer, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=recibo.pdf",
          },
        });

        resolve(response);
      });
    });
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
