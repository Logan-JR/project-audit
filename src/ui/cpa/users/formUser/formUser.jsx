"use client";
import { useEffect } from "react";
import Image from "next/image";
import styles from "@/ui/cpa/users/formUser/formUser.module.css";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

const getImage = () =>
  `https://rickandmortyapi.com/api/character/avatar/${
    Math.floor(Math.random() * 826) + 1
  }.jpeg`;

const FormUser = () => {
  const route = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const getUser = async () => {
    const res = await fetch(`/api/cpa/users/${params.id}`);
    const data = await res.json();
    const { img, username, fullname, email, password, phone, role, status } =
      data;
    reset({
      img,
      username,
      fullname,
      email,
      password,
      phone,
      role,
      status,
    });
  };

  const logUser = async (type, date, object) => {
    try {
      if (status === "authenticated") {
        const { img, fullname, role, status } = session.user;
        const res = await fetch("/api/cpa/log", {
          method: "POST",
          body: JSON.stringify({
            modifiedByUser: { img, name: fullname, role, status },
            operationType: type,
            where: "USERS",
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

  const createUser = async (user) => {
    try {
      const res = await fetch("/api/cpa/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        await logUser("INSERT", data.createdAt, data);
        route.push("/cpa/users");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (user) => {
    try {
      const res = await fetch(`/api/cpa/users/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        await logUser("UPDATE", data.updatedAt, data);
        route.push("/cpa/users");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`/api/cpa/users/${params.id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (res.ok) {
          await logUser("DELETE", new Date(), data);
          route.push("/cpa/users");
          route.refresh();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = async (e) => {
    if (!params.id) await createUser(e);
    else {
      await updateUser(e);
    }
  };

  useEffect(() => {
    if (params.id) getUser();
    else {
      setValue("img", getImage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={watch("img") || "/noavatar.png"}
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
            })}
          />
          {errors.username && <span>{errors.username.message}</span>}
          <label>Nombre Completo</label>
          <input
            type="text"
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
            })}
          />
          {errors.fullname && <span>{errors.fullname.message}</span>}
          <label>Correo</label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "El correo es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
                message: "Correo no valido",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <label>Contraseña</label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Ingrese una contraseña",
              },
              minLength: {
                value: 8,
                message: "La contraseña es demasiado corta",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <label>Telefono</label>
          <input
            type="text"
            {...register("phone", {
              pattern: {
                value: /^\d{8,}$/,
                message: "Numero de telefono no valido",
              },
            })}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
          <label>Elige un Rol</label>
          <select
            {...register("role", {
              required: {
                value: true,
                message: "Rol es requerido",
              },
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
            {...register("status", {
              required: {
                value: true,
                message: "El estado es requerido",
              },
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
