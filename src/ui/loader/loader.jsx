import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
