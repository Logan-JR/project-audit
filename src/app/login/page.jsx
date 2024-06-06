"use client";
import styles from "@/ui/login/login.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) setError(res.error);
      if (res?.ok && status === "authenticated") {
        const role = session.user.role;
        const routePath =
          role === "admin"
            ? "/cpa"
            : role === "secretario"
            ? "/academic"
            : "/courses";
        return route.push(routePath);
      }
    } catch (error) {
      console.log(error);
    }
  });

  const handlerChange = () => setError("");

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form} noValidate>
        {error && <span>{error}</span>}
        <p>Inicio de Sesión</p>
        <input
          type="email"
          placeholder="correo"
          {...register("email", {
            required: {
              value: true,
              message: "El correo es requerido",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
              message: "El correo no es valido"
            },
            onChange: handlerChange,
          })}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
        <input
          type="password"
          placeholder="********"
          {...register("password", {
            required: {
              value: true,
              message: "El correo es requerido",
            },
            minLength: {
              value: 8,
              message: "Contraseña demasiada corta"
            },
            onChange: handlerChange,
          })}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
