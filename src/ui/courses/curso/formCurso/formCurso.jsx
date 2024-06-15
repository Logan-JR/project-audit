"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/ui/courses/curso/formCurso/formCurso.module.css";
import { useRouter, useParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { formatDate } from "@/utils/date";

const FormCurso = () => {
  const route = useRouter();
  const params = useParams();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "modules",
  });
  const handleAddModule = () =>
    append({ name: "", date: "", academicHours: "" });

  const getCurso = async () => {
    const res = await fetch(`/api/courses/curso/${params.id}`);
    const data = await res.json();
    reset({
      course: data.course,
      modules: data.modules.map((mod) => ({
        name: mod.name,
        date: formatDate(mod.date),
        academicHours: mod.academicHours,
      })),
    });
  };

  const createCurso = async (curso) => {
    try {
      const res = await fetch("/api/courses/curso", {
        method: "POST",
        body: JSON.stringify(curso),
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

  const updateCurso = async (curso) => {
    try {
      const res = await fetch(`/api/courses/curso/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(curso),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
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

  const onSubmit = handleSubmit(async (data) => {
    if (!params.id) await createCurso(data);
    else {
      updateCurso(data);
    }
  });

  useEffect(() => {
    if (params.id) getCurso();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/audit-03.png"} alt="" width={300} height={300} />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.curso}>
            <div className={styles.form}>
              <label>Curso</label>
              <input
                type="text"
                {...register("course", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                })}
              />
              {errors.course && <span>{errors.course.message}</span>}
            </div>
            <button type="button" onClick={handleAddModule}>
              Nuevo Modulo
            </button>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.fields}>
              <div className={styles.form}>
                <label>Modulo</label>
                <input
                  type="text"
                  {...register(`modules.${index}.name`, {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                  })}
                />
                {errors.modules?.[index]?.name && (
                  <span>{errors.modules[index].name.message}</span>
                )}
              </div>
              <div className={styles.form}>
                <label>Fecha</label>
                <input
                  type="date"
                  placeholder="Ej. yyyy-mm-dd"
                  {...register(`modules.${index}.date`, {
                    required: {
                      value: true,
                      message: "Ingrese una fecha",
                    },
                  })}
                />
                {errors.modules?.[index]?.date && (
                  <span>{errors.modules[index].date.message}</span>
                )}
              </div>
              <div className={styles.form}>
                <label>Horas</label>
                <input
                  type="number"
                  {...register(`modules.${index}.academicHours`, {
                    required: {
                      value: true,
                      message: "Ingrese las horas academicas",
                    },
                  })}
                />
                {errors.modules?.[index]?.academicHours && (
                  <span>{errors.modules[index].academicHours.message}</span>
                )}
              </div>
              <div className={styles.form}>
                <label>Archivo</label>
                <input
                  type="file"
                  {...register(`modules.${index}.fileCourse`)}
                />
                {errors.modules?.[index]?.fileCourse && (
                  <span>{errors.modules[index].fileCourse.message}</span>
                )}
              </div>
              <div>
                <button type="button" onClick={() => remove(index)}>
                  Eliminar Modulo
                </button>
              </div>
            </div>
          ))}
          <div className={styles.send}>
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
            <Link href={"/courses/curso"}>
              <button>Cancelar</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCurso;
