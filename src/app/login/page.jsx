"use client";
import styles from "@/ui/login/login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const route = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.ok) return route.push("/cpa");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p>Login</p>
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
