"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import styles from "@/ui/courses/inscription/formInscription/formInscription.module.css";
import { viewDate } from "@/utils/date";

export default function FormInscription() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const getCourses = async () => {
    try {
      const res = await fetch("/api/courses/curso");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createInscription = async (e) => {
    try {
      setLoading(true);
      const res = await fetch("/api/courses/inscription", {
        method: "POST",
        body: JSON.stringify(e),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        route.push("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onSubmit = handleSubmit(async (e) => {
    const { course, ...data } = e;
    createInscription(data);
  });

  function openImageModal() {
    setIsImageModalOpen(true);
  }

  function closeImageModal() {
    setIsImageModalOpen(false);
  }

  const handleCourseChange = (e) => {
    const course = courses.find((course) => course._id === e.target.value);
    setSelectedCourse(course);
    setValue("curso", course);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className={styles.formContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Formulario de Registro</h2>
          <p className={styles.cardDescription}>
            Por favor, completa todos los campos del formulario.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <input
              placeholder="Ingrese su numero de CI"
              className={errors.ci ? styles.error : ""}
              {...register("ci", {
                required: {
                  value: true,
                  message: "El CI es requerido",
                },
                minLength: {
                  value: 7,
                  message: "El CI es demasiado corto",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Caracter no valido",
                },
              })}
            />
            {errors.ci && (
              <span className={styles.errorMessage}>{errors.ci.message}</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              placeholder="Ingrese su nombre"
              className={errors.nombre ? styles.error : ""}
              {...register("nombre", {
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Caracter no valido",
                },
                validate: (value) => {
                  if (value.trim() === "") {
                    return "No se puede enviar espacios en blanco";
                  }
                  return true;
                },
              })}
            />
            {errors.nombre && (
              <span className={styles.errorMessage}>
                {errors.nombre.message}
              </span>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              placeholder="Ingrese su apellido paterno"
              className={errors.paterno ? styles.error : ""}
              {...register("paterno", {
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Caracter no valido",
                },
                validate: (value) =>
                  value.trim() === "" && watch("materno").trim() === ""
                    ? "Ingrese su apellido paterno"
                    : true,
              })}
            />
            {errors.paterno && (
              <span className={styles.errorMessage}>
                {errors.paterno.message}
              </span>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              placeholder="Ingrese su apellido materno"
              className={errors.materno ? styles.error : ""}
              {...register("materno", {
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Caracter no valido",
                },
                validate: (value) =>
                  value.trim() === "" && watch("paterno").trim() === ""
                    ? "Ingrese su apellido materno"
                    : true,
              })}
            />
            {errors.materno && (
              <span className={styles.errorMessage}>
                {errors.materno.message}
              </span>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              className={errors.correo ? styles.error : ""}
              {...register("correo", {
                required: {
                  value: true,
                  message: "Ingrese su correo",
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
                  message: "El correo no es valido",
                },
              })}
            />
            {errors.correo && (
              <span className={styles.errorMessage}>
                {errors.correo.message}
              </span>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              placeholder="Ingrese su numero de celular"
              className={errors.celular ? styles.error : ""}
              {...register("celular", {
                required: {
                  value: true,
                  message: "Ingrese su numero de celular",
                },
                pattern: {
                  value: /^[0-9-]+$/,
                  message: "Caracter no valido",
                },
              })}
            />
            {errors.celular && (
              <span className={styles.errorMessage}>
                {errors.celular.message}
              </span>
            )}
          </div>
          <div className={styles.formGroup}>
            <select
              className={errors.grado ? styles.error : ""}
              {...register("grado", {
                required: {
                  value: true,
                  message: "Seleccione una opción",
                },
              })}
            >
              <option value="">Seleccionar grado academico</option>
              <option value=" ">Estudiante</option>
              <option value="lic">Licenciado/a</option>
              <option value="ing">Ingeniero/a</option>
            </select>
            {errors.grado && (
              <span className={styles.errorMessage}>
                {errors.grado.message}
              </span>
            )}
          </div>
          <div className={styles.formGroup}>
            <select
              className={errors.course ? styles.error : ""}
              {...register("course", {
                required: {
                  value: true,
                  message: "Seleccione una opción",
                },
                onChange: handleCourseChange,
              })}
            >
              <option value="">Seleccionar curso</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
            {errors.course && (
              <span className={styles.errorMessage}>
                {errors.course.message}
              </span>
            )}
          </div>
          {selectedCourse && (
            <div className={styles.coursePreview}>
              <div
                className={styles.coursePreviewImage}
                onClick={openImageModal}
              >
                <Image
                  src={selectedCourse.flyer}
                  alt={`Flyer del curso ${selectedCourse.nombre}`}
                  width={200}
                  height={200}
                />
              </div>
              <div className={styles.coursePreviewContent}>
                <h3>{selectedCourse.title}</h3>
                <p>{selectedCourse.detail}</p>
                <p>Fecha de inicio: {viewDate(selectedCourse.startDate)}</p>
                <p>Hora: {selectedCourse.hour}</p>
                <p>Costo: {selectedCourse.costo} Bs</p>
                <p>Horas académicas: {selectedCourse.academicHours}</p>
              </div>
            </div>
          )}
          <button
            type="submit"
            className={`${styles.submitButton} ${
              loading ? styles.buttonLoading : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.loader}></span>
              </>
            ) : (
              "Registrar Inscripción"
            )}
          </button>
          <div className={styles.footerLink}>
            <Link href={"/"}>Ir al inicio</Link>
          </div>
        </form>
      </div>
      {isImageModalOpen && selectedCourse && (
        <div className={styles.modal} onClick={closeImageModal}>
          <div className={styles.modalContent}>
            <Image
              src={selectedCourse.flyer}
              alt={`Flyer del curso ${selectedCourse.title}`}
              width={1200}
              height={100}
            />
          </div>
          <span className={styles.closeButton} onClick={closeImageModal}>
            &times;
          </span>
        </div>
      )}
    </div>
  );
}
