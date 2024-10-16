"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/ui/courses/curso/formCurso/formCurso.module.css";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { formatDate } from "@/utils/date";

const FormCurso = () => {
  const route = useRouter();
  const params = useParams();
  const [img, setImg] = useState("/noavatar.png");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getCurso = async () => {
    const res = await fetch(`/api/courses/curso/${params.id}`);
    const data = await res.json();
    setImg(data.flyer);
    reset({
      title: data.title,
      detail: data.detail,
      startDate: formatDate(data.startDate),
      academicHours: data.academicHours,
      hour: data.hour,
      flyer: data.flyer,
    });
  };

  const createCurso = async (curso) => {
    try {
      const formData = new FormData();
      const appendFormData = (data, root = "") => {
        for (let key in data) {
          const value = data[key];
          const formKey = root ? `${root}[${key}]` : key;
          if (value && typeof value === "object" && !(value instanceof File)) {
            appendFormData(value, formKey);
          } else {
            formData.append(formKey, value);
          }
        }
      };
      appendFormData(curso);
      const res = await fetch("/api/courses/curso", {
        method: "POST",
        body: formData,
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
      const formData = new FormData();
      const appendFormData = (data, root = "") => {
        for (let key in data) {
          const value = data[key];
          const formKey = root ? `${root}[${key}]` : key;
          if (value && typeof value === "object" && !(value instanceof File)) {
            appendFormData(value, formKey);
          } else {
            formData.append(formKey, value);
          }
        }
      };
      appendFormData(curso);
      const res = await fetch(`/api/courses/curso/${params.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        route.push("/courses/curso");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Estas seguro de querer borrar este curso?")) {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file === undefined) setImg('/noavatar.png')
    if (file) setImg(URL.createObjectURL(file));
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
          <Image src={img} alt="" width={300} height={300} priority />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmit} className={styles.form}>
          <div>
            <div className={styles.form}>
              <label>Curso</label>
              <input
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "El nombre es requerido",
                  },
                })}
              />
              {errors.title && <span>{errors.title.message}</span>}
            </div>
            <div className={styles.form}>
              <label>Descripción</label>
              <input
                type="text"
                {...register("detail", {
                  required: {
                    value: false,
                    message: "El detail es requerido",
                  },
                })}
              />
              {errors.detail && <span>{errors.detail.message}</span>}
            </div>
            <div className={styles.form}>
              <label>Fecha de Inicio</label>
              <input
                type="date"
                {...register("startDate", {
                  required: {
                    value: true,
                    message: "Ingrese una fecha",
                  },
                })}
              />
              {errors.startDate && <span>{errors.startDate.message}</span>}
            </div>
            <div className={styles.form}>
              <label>Hora</label>
              <input
                type="text"
                {...register("hour", {
                  required: {
                    value: true,
                    message: "Ingrese la hora de inicio",
                  },
                })}
              />
              {errors.hour && <span>{errors.hour.message}</span>}
            </div>
            <div className={styles.form}>
              <label>Horas Academicas</label>
              <input
                type="text"
                {...register("academicHours", {
                  required: {
                    value: true,
                    message: "Ingrese las horas academicas",
                  },
                })}
              />
              {errors.academicHours && (
                <span>{errors.academicHours.message}</span>
              )}
            </div>
            <div className={styles.form}>
              <label>Afiche</label>
              <input
                type="file"
                accept="image/*"
                {...register("flyer", {
                  onChange: handleImageChange,
                  validate: (value) =>
                    typeof value === "string" ||
                    typeof value?.[0] !== "undefined" ||
                    "El afiche es requerido",
                })}
              />
              {errors.flyer && <span>{errors.flyer.message}</span>}
            </div>
          </div>
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
