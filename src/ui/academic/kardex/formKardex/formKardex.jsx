"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/ui/academic/kardex/formKardex/formKardex.module.css";
import { useRouter, useParams } from "next/navigation";

const FormUser = () => {
  const [newKardex, setNewKardex] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    ci: "",
    ru: "",
  });
  const route = useRouter();
  const params = useParams();

  const getKardex = async () => {
    const res = await fetch(`/api/academic/kardex/${params.id}`);
    const data = await res.json();
    setNewKardex({
      nombre: data.nombre,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      ci: data.ci,
      ru: data.ru,
    });
  };

  const createKardex = async () => {
    try {
      const res = await fetch("/api/academic/kardex", {
        method: "POST",
        body: JSON.stringify(newKardex),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        route.push("/academic/students");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateKardex = async () => {
    try {
      const res = await fetch(`/api/academic/kardex/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newKardex),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      route.push("/academic/students");
      route.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this kardex?")) {
      try {
        const res = await fetch(`/api/academic/kardex/${params.id}`, {
          method: "DELETE",
        });
        route.push("/academic/students");
        route.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!params.id) await createKardex();
    else {
      updateKardex();
    }
  };

  const handleChange = (e) => {
    setNewKardex({ ...newKardex, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (params.id) getKardex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={"/noavatar.png"}
            alt=""
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form action={handleSubmit} className={styles.form}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            onChange={handleChange}
            value={newKardex.nombre}
          />
          <label>Apellido Paterno</label>
          <input
            type="text"
            name="apellidoPaterno"
            onChange={handleChange}
            value={newKardex.apellidoPaterno}
          />
          <label>Apellido Materno</label>
          <input
            type="text"
            name="apellidoMaterno"
            onChange={handleChange}
            value={newKardex.apellidoMaterno}
          />
          <label>RU</label>
          <input
            type="text"
            name="ru"
            onChange={handleChange}
            value={newKardex.ru}
          />
          <label>CI</label>
          <input
            type="text"
            name="ci"
            onChange={handleChange}
            value={newKardex.ci}
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

export default FormUser;
