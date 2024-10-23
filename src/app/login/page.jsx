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
        <h2 className={styles.title}>Inicio de Sesión</h2>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="email"
            placeholder="Correo"
            {...register("email", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
                message: "El correo no es valido",
              },
              onChange: handlerChange,
            })}
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              minLength: {
                value: 8,
                message: "Contraseña demasiada corta",
              },
              onChange: handlerChange,
            })}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password.message}</p>
          )}
        </div>
        <button
          className={`${styles.button} ${loading ? styles.buttonLoading : ""}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className={styles.loader}></span>
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </button>
        {error && <span style={{display: "flex", justifyContent: "center"}} className={styles.error}>{error}</span>}
        <Link className={styles.link} href={"/"}>
          Ir al inicio
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
