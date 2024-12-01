"use client";
import styles from "@/ui/courses/inscription/inscription.module.css";

const PDFkit = (props) => {
  const handleClick = async () => {
    const response = await fetch(`/api/courses/inscription/recibo/${props.ci}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${props.ci}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <button
      type="submit"
      className={`${styles.button} ${styles.view}`}
      onClick={handleClick}
    >
      Recibo
    </button>
  );
};

export default PDFkit;
