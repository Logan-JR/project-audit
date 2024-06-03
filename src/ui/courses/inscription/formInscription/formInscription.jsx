"use client";
import Image from "next/image";
import styles from "@/ui/courses/inscription/formInscription/formInscription.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const FormInscription = () => {
  const [list, setList] = useState([]);
  const [data, setData] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/courses/curso");
    const data = await res.json();
    setData(data);
  };

  const onSubmit = (e) => {
    console.log(e);
  };

  const handleAddCourse = () => {
    setList([...list, { course: "", modules: [] }]);
  };

  const handleRemoveCourse = (index) => {
    const newListCourse = list.filter((_, i) => i !== index);
    setList(newListCourse);
  };

  const handleListChanges = (index, e) => {
    const updateList = [...list];
    updateList[index].course = e.target.value;
    setList(updateList);
  };

  useEffect(() => {
    fetchData();
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
          <label htmlFor="materno-id">Apellido Materno</label>
          <input
            id="materno-id"
            type="text"
            {...register("materno", {
              minLength: { value: 3, message: "El apellido es muy corto" },
            })}
          />
          {errors.materno && <span>{errors.materno.message}</span>}
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
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: { value: true, message: "El correo es requerido" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
                message: "Correo no valido",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <label>Cursos</label>
          {list.map((_, index) => (
            <div key={index}>
              <div>
                <label>Nombre</label>
                <select
                  onChange={(e) => handleListChanges(index, e)}
                  {...register("course")}
                >
                  <option value="">Eliga una opcion</option>
                  {data?.map((curso) => (
                    <option key={curso._id} value={curso.course}>
                      {curso.course}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={() => handleRemoveCourse(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddCourse}>
            Add
          </button>
          <button>Crear</button>
        </form>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormInscription;
