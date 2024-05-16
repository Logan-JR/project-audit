"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/ui/courses/curso/formCurso/formKardex.module.css";
import { useRouter, useParams } from "next/navigation";

const FormCurso = () => {
  const [newCurso, setNewCurso] = useState({
    curso: "",
    horasAcademicas: "",
    modulo: "",
    fecha: "",
  });
  const route = useRouter();
  const params = useParams();

  const getCurso = async () => {
    const res = await fetch(`/api/courses/curso/${params.id}`);
    const data = await res.json();
    setNewCurso({
      curso: data.curso,
      horasAcademicas: data.horasAcademicas,
      modulo: data.modulo,
      fecha: data.fecha,
    });
  };

  const createCurso = async () => {
    try {
      const res = await fetch("/api/courses/curso", {
        method: "POST",
        body: JSON.stringify(newCurso),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        route.push("/courses/curso");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCurso = async () => {
    try {
      const res = await fetch(`/api/courses/curso/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newCurso),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      route.push("/courses/curso");
      route.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this curso?")) {
      try {
        const res = await fetch(`/api/courses/curso/${params.id}`, {
          method: "DELETE",
        });
        route.push("/courses/curso");
        route.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!params.id) await createCurso();
    else {
      updateCurso();
    }
  };

  const handleChange = (e) => {
    setNewCurso({ ...newCurso, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (params.id) getCurso();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/noavatar.png"} alt="" width={300} height={300} />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form action={handleSubmit} className={styles.form}>
          <label>Curso</label>
          <input
            type="text"
            name="curso"
            onChange={handleChange}
            value={newCurso.curso}
          />
          <label>Horas Academicas</label>
          <input
            type="text"
            name="horasAcademicas"
            onChange={handleChange}
            value={newCurso.horasAcademicas}
          />
          <label>Modulos</label>
          <input
            type="text"
            name="modulo"
            onChange={handleChange}
            value={newCurso.modulo}
          />
          <label>Fecha</label>
          <input
            type="text"
            name="fecha"
            onChange={handleChange}
            value={newCurso.fecha}
          />
          <button type="submit">{!params.id ? "Crear" : "Actualizar"}</button>
          {!params.id ? (
            ""
          ) : (
            <button
              className={styles.delete}
              type="button"
              onClick={handleDelete}
            >
              Borrar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormCurso;
