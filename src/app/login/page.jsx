"use client";
import styles from "@/ui/login/login.module.css";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) setError(res.error);
      if (res?.ok) setIsLoggingIn(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  });

  const handlerChange = () => setError("");

  useEffect(() => {
    if (isLoggingIn && status === "authenticated") {
      const role = session.user.role;
      const routePath =
        role === "admin"
          ? "/cpa"
          : role === "secretario"
          ? "/academic"
          : "/courses";
      route.push(routePath);
    }
  }, [status, isLoggingIn, session, route]);

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form} noValidate>
        {error && <span>{error}</span>}
        {loading && <div>Cargando, por favor espere...</div>}
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
              message: "El correo no es valido",
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
              message: "Ingrese su contraseña",
            },
            minLength: {
              value: 8,
              message: "Contraseña demasiada corta",
            },
            onChange: handlerChange,
          })}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
        <button>Login</button>
        <Link className={styles.home} href={"/"}>
          Ir al inicio
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
