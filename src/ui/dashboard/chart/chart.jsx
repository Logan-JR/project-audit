"use client";

import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Ene",
    inscritos: 4000,
    abandono: 2400,
  },
  {
    name: "Feb",
    inscritos: 3000,
    abandono: 1398,
  },
  {
    name: "Mar",
    inscritos: 2000,
    abandono: 3800,
  },
  {
    name: "Abr",
    inscritos: 2780,
    abandono: 3908,
  },
  {
    name: "May",
    inscritos: 1890,
    abandono: 4800,
  },
  {
    name: "Jun",
    inscritos: 2390,
    abandono: 3800,
  },
  {
    name: "Jul",
    inscritos: 3490,
    abandono: 4300,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reporte de Estudiantes</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="inscritos"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="abandono"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
