"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GraficoVentas() {
  const [datosMensuales, setDatosMensuales] = useState([]);
  const [totalKardex, setTotalKardex] = useState(0);

  const getKardex = async () => {
    try {
      const res = await fetch("/api/academic/kardex");
      const data = await res.json();

      const meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];

      const kardexPorMes = meses.reduce((acc, mes) => {
        acc[mes] = 0;
        return acc;
      }, {});

      data.forEach((item) => {
        const createdAt = new Date(item.createdAt);
        const mes = meses[createdAt.getMonth()];
        kardexPorMes[mes] += 1;
      });
      const datosFormateados = meses.map((mes) => ({
        mes,
        "Kardex Academicos": kardexPorMes[mes],
      }));
      const total = data.length;
      setDatosMensuales(datosFormateados);
      setTotalKardex(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKardex();
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>Gráfico de Kardex Academicos</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={datosMensuales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Kardex Academicos"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey={`Total: ${totalKardex}`}
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
