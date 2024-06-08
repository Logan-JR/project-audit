"use client";
import Image from "next/image";
import styles from "@/ui/courses/inscription/formInscription/formInscription.module.css";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";

const FormInscription = () => {
  const [courses, setCourses] = useState();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });

  const handleAddList = () => append({ course: "", modules: "" });
  const getCourses = async () => {
    const res = await fetch("/api/courses/curso");
    const data = await res.json();
    setCourses(data);
  };

  const onSubmit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/noavatar.png"} alt="" width={300} height={300} />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <div className={styles.names}>
            <div className={styles.form}>
              <label htmlFor="name-id">Nombre</label>
              <input
                id="name-id"
                type="text"
                {...register("name", {
                  required: { value: true, message: "El nombre es requerido" },
                  minLength: { value: 3, message: "El nombre es muy corto" },
                })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className={styles.form}>
              <label htmlFor="paterno-id">Apellido Paterno</label>
              <input
                id="paterno-id"
                type="text"
                {...register("paterno", {
                  required: {
                    value: true,
                    message: "El apellido paterno es requerido",
                  },
                  minLength: { value: 3, message: "El apellido es muy corto" },
                })}
              />
              {errors.paterno && <span>{errors.paterno.message}</span>}
            </div>
            <div className={styles.form}>
              <label htmlFor="materno-id">Apellido Materno</label>
              <input
                id="materno-id"
                type="text"
                {...register("materno", {
                  minLength: { value: 3, message: "El apellido es muy corto" },
                })}
              />
              {errors.materno && <span>{errors.materno.message}</span>}
            </div>
          </div>
          <div className={styles.names}>
            <div className={styles.form}>
              <label htmlFor="ci">CI</label>
              <input
                id="ci"
                type="text"
                {...register("ci", {
                  required: { value: true, message: "CI es requerido" },
                  minLength: { value: 6, message: "El CI es muy corto" },
                })}
              />
              {errors.ci && <span>{errors.ci.message}</span>}
            </div>
            <div className={styles.form}>
              <label htmlFor="email">Correo</label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: { value: true, message: "El correo es requerido" },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
                    message: "Correo no valido",
                  },
                })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          </div>
          <div>
            <label>Cursos</label>
            <button type="button" onClick={handleAddList}>
              Add
            </button>
            {fields.map((field, index) => (
              <div key={field.id}>
                <label>Nombre</label>
                <select
                  {...register(`list.${index}.course`, {
                    required: {
                      value: true,
                      message: "Seleccione un curso",
                    },
                  })}
                >
                  <option value="">Eliga una opcion</option>
                  {courses?.map((curso) => {
                    return (
                      <option key={curso._id} value={curso.course}>
                        {curso.course}
                      </option>
                    );
                  })}
                </select>
                {errors.list?.[index]?.course && (
                  <span>{errors.list[index].course.message}</span>
                )}
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <button>Crear</button>
          </div>
        </form>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormInscription;
