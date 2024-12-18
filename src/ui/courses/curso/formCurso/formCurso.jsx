"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/ui/courses/curso/formCurso/formCurso.module.css";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { formatDate } from "@/utils/date";
import { useSession } from "next-auth/react";

const FormCurso = () => {
  const route = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
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
      costo: data.costo,
    });
  };

  const logCurso = async (type, date, object) => {
    try {
      if (status === "authenticated") {
        const { img, fullname, role, status } = session.user;
        const res = await fetch("/api/cpa/log", {
          method: "POST",
          body: JSON.stringify({
            modifiedByUser: { img, name: fullname, role, status },
            operationType: type,
            where: "COURSE",
            modifiedDate: date,
            modifiedObject: object,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
      }
    } catch (error) {
      console.log(error);
    }
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
        await logCurso("INSERT", data.createdAt, data);
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
        await logCurso("UPDATE", data.updatedAt, data);
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
        const data = await res.json();
        if (res.ok) {
          await logCurso("DELETE", new Date(), data);
          route.push("/courses/curso");
          route.refresh();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file === undefined) setImg("/noavatar.png");
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
                  pattern: {
                    value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ.,\s]+$/,
                    message: "Caracter no valido",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "No puede ser solo espacios vacíos",
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
                  pattern: {
                    value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ.,\s]+$/,
                    message: "Caracter no valido",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "No puede ser solo espacios vacíos",
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
                  validate: (value) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const selectedDate = new Date(value);
                    return (
                      selectedDate >= today || "Ingrese una fecha valida futura"
                    );
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
                  pattern: {
                    value: /^(0[1-9]|1[0-2]):[0-5][0-9](am|pm)$/i,
                    message: "Formato invalido. Ej: 09:59am, 03:30pm",
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
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Ingrese un numero valido",
                  },
                })}
              />
              {errors.academicHours && (
                <span>{errors.academicHours.message}</span>
              )}
            </div>
            <div className={styles.form}>
              <label>Precio</label>
              <input
                type="text"
                {...register("costo", {
                  required: {
                    value: true,
                    message: "Ingrese el precio",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Caracter no valido",
                  },
                })}
              />
              {errors.costo && <span>{errors.costo.message}</span>}
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
