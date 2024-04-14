import styles from "./loginForm.module.css";

const LoginForm = () => {
  return (
    <form action="" className={styles.form}>
      <p>Login</p>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
