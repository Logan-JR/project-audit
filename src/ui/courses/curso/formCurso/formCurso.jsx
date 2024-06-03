"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/ui/courses/curso/formCurso/formCurso.module.css";
import { useRouter, useParams } from "next/navigation";

const FormCurso = () => {
  const [newCurso, setNewCurso] = useState("");
  const [modules, setModules] = useState([]);
  const route = useRouter();
  const params = useParams();

  const handleAddModule = () => {
    setModules([...modules, { name: "", date: "", academicHours: "" }]);
  };

  const handleRemoveModule = (index) => {
    const newModules = modules.filter((_, i) => i !== index);
    setModules(newModules);
  };

  const handleModuleChange = (index, e) => {
    const newModules = [...modules];
    newModules[index][e.target.name] = e.target.value;
    setModules(newModules);
  };

  const getCurso = async () => {
    const res = await fetch(`/api/courses/curso/${params.id}`);
    const data = await res.json();
    setNewCurso(data.course);
    setModules(data.modules);
  };

  const createCurso = async () => {
    try {
      const res = await fetch("/api/courses/curso", {
        method: "POST",
        body: JSON.stringify({ course: newCurso, modules }),
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
        body: JSON.stringify({ course: newCurso, modules }),
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
          <div>
            <label>Curso</label>
            <input
              type="text"
              value={newCurso}
              onChange={(e) => setNewCurso(e.target.value)}
              required
            />
          </div>

          {modules.map((module, index) => (
            <div key={index}>
              <label>Modulo</label>
              <input
                type="text"
                name="name"
                value={module.name}
                onChange={(e) => handleModuleChange(index, e)}
                required
              />

              <label>Fecha</label>
              <input
                type="text"
                name="date"
                placeholder="Ej. yyyy-mm-dd"
                onChange={(e) => handleModuleChange(index, e)}
                required
              />

              <label>Horas</label>
              <input
                type="number"
                name="academicHours"
                value={module.academicHours}
                onChange={(e) => handleModuleChange(index, e)}
                required
              />

              <button type="button" onClick={() => handleRemoveModule(index)}>
                Eliminar Modulo
              </button>
            </div>
          ))}

          <button type="button" onClick={handleAddModule}>
            Nuevo Modulo
          </button>
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
