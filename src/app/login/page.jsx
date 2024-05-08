"use client";
import styles from "@/ui/login/login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState("");
  const route = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });
      if (res?.error) setError(res.error);
      if (res?.ok) return route.push("/cpa");
    } catch (error) {
      console.log(error);
    }
  };

  const handlerChange = () => setError("");

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}> {error} </div>}
        <p>Login</p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handlerChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handlerChange}
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
