"use client";
import { useEffect, useState } from "react";
import styles from "./exportar.module.css";
import Link from "next/link";

const Exportar = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [confirmStatus, setConfirmStatus] = useState("all");

  const getCourses = async () => {
    try {
      const res = await fetch("/api/courses/curso");
      const data = await res.json();

      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadLista = async () => {
    try {
      const res = await fetch("/api/courses/inscription");
      const data = await res.json();
      const filteredData = data.filter((inscripcion) => {
        const isCourseMatch = inscripcion.curso?._id === selectedCourse;
        const isConfirmMatch =
          confirmStatus === "all" ||
          (confirmStatus === "true" && inscripcion.confirmado) ||
          (confirmStatus === "false" && !inscripcion.confirmado);

        return isCourseMatch && isConfirmMatch;
      });
      console.log(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCourseChange = (e) => {
    const course = courses.find((course) => course._id === e.target.value);
    setSelectedCourse(course?._id);
  };

  const handleConfirmChange = (e) => {
    setConfirmStatus(e.target.value);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.formGroup}>
            <label htmlFor="curso" className={styles.label}>
              Seleccionar curso
            </label>
            <select
              id="curso"
              onChange={handleCourseChange}
              className={styles.select}
            >
              <option value="">Seleccionar curso</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmado" className={styles.label}>
              Estado de confirmación
            </label>
            <select
              id="confirmado"
              onChange={handleConfirmChange}
              defaultValue="all"
              className={styles.select}
            >
              <option value="all">Todos</option>
              <option value="true">Confirmados</option>
              <option value="false">No confirmados</option>
            </select>
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={loadLista} className={styles.button}>
            Exportar
          </button>
          <Link href={"/courses/inscription"}>
            <button className={styles.button}>Cancelar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Exportar;
