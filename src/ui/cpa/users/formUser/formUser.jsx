"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/ui/cpa/users/formUser/formUser.module.css";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const FormUser = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [newUser, setNewUser] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    status: "",
    img: `https://rickandmortyapi.com/api/character/avatar/${
      Math.floor(Math.random() * 826) + 1
    }.jpeg`,
    modifiedBy: session?.user,
  });
  const route = useRouter();
  const params = useParams();

  const getUser = async () => {
    const res = await fetch(`/api/cpa/users/${params.id}`);
    const data = await res.json();
    setNewUser({
      username: data.username,
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
      status: data.status,
      img: data.img,
      modifiedBy: session.user,
    });
    setValue("username", data.username);
    setValue("fullname", data.fullname);
    setValue("email", data.email);
    setValue("password", data.password);
    setValue("phone", data.phone);
    setValue("role", data.role);
    setValue("status", data.status);
  };

  const createUser = async () => {
    try {
      const res = await fetch("/api/cpa/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        route.push("/cpa/users");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      const res = await fetch(`/api/cpa/users/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      route.push("/cpa/users");
      route.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const resUp = await fetch(`/api/cpa/users/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await fetch(`/api/cpa/users/${params.id}`, {
          method: "DELETE",
        });
        route.push("/cpa/users");
        route.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = async (e) => {
    if (!params.id) await createUser();
    else {
      updateUser();
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (params.id) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={newUser.img || "/noavatar.png"}
            alt=""
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <label>Nombre de Usuario</label>
          <input
            type="text"
            value={newUser.username}
            {...register("username", {
              required: { value: true, message: "El nombre es requerido" },
              minLength: {
                value: 3,
                message: "El nombre ingresado es demasiado corto",
              },
              maxLength: {
                value: 15,
                message: "El nombre es demasiado largo",
              },
              pattern: {
                value: /^[a-zA-Z0-9_-]+$/,
                message: "Nombre de usuario no Valido",
              },
              onChange: handleChange,
            })}
          />
          {errors.username && <span>{errors.username.message}</span>}
          <label>Nombre Completo</label>
          <input
            type="text"
            value={newUser.fullname}
            {...register("fullname", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 3,
                message: "El nombre ingresado es demasiado corto",
              },
              maxLength: {
                value: 40,
                message: "El nombre es demasiado largo",
              },
              onChange: handleChange,
            })}
          />
          {errors.fullname && <span>{errors.fullname.message}</span>}
          <label>Correo</label>
          <input
            type="email"
            value={newUser.email}
            {...register("email", {
              required: {
                value: true,
                message: "El correo es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
                message: "Correo no valido",
              },
              onChange: handleChange,
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <label>Contraseña</label>
          <input
            type="password"
            value={newUser.password}
            {...register("password", {
              required: {
                value: true,
                message: "Ingrese una contraseña",
              },
              minLength: {
                value: 8,
                message: "La contraseña es demasiado corta",
              },
              onChange: handleChange,
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <label>Telefono</label>
          <input
            type="text"
            value={newUser.phone}
            {...register("phone", {
              pattern: {
                value: /^\d{8,}$/,
                message: "Numero de telefono no valido",
              },
              onChange: handleChange,
            })}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
          <label>Elige un Rol</label>
          <select
            value={newUser.role}
            {...register("role", {
              required: {
                value: true,
                message: "Rol es requerido",
              },
              onChange: handleChange,
            })}
          >
            <option value="">Elegir</option>
            <option value="admin">Administrador</option>
            <option value="secretario">Secretario</option>
            <option value="cursos">Responsable Cursos</option>
          </select>
          {errors.role && <span>{errors.role.message}</span>}
          <label>Estado</label>
          <select
            value={newUser.status}
            {...register("status", {
              required: {
                value: true,
                message: "El estado es requerido",
              },
              onChange: handleChange,
            })}
          >
            <option value="">Elegir</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && <span>{errors.status.message}</span>}
          <div>
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
            <Link href={"/cpa/users"}>
              <button>Cancelar</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUser;
