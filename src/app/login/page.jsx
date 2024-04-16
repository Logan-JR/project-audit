import styles from "@/ui/login/login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <p>Login</p>
        <input type="text" placeholder="username" name="username" required />
        <input type="password" placeholder="password" name="password" required />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
