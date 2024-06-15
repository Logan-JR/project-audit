"use client";
import { useEffect, useState } from "react";
import styles from "@/ui/cpa/backup/backup.module.css";

export default function Backup() {
  const [message, setMessage] = useState("");
  const [backups, setBackups] = useState([]);
  const [error, setError] = useState("");
  const handleBackup = async () => {
    setMessage("Realizando la copia de seguridad...");
    setError("");
    try {
      const response = await fetch("/api/backup", {
        method: "POST",
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(
          `Copia de seguridad realizada con éxito. Ruta: ${data.backupPath}`
        );
        fetchBackups();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const fetchBackups = async () => {
    try {
      const response = await fetch("/api/list-backups");
      const data = await response.json();
      if (response.ok) {
        setBackups(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  return (
    <>
      <div className={styles.container_btn}>
        <button className={styles.btn} onClick={handleBackup}>
          Crear copia de seguridad
        </button>
      </div>
      <div className={styles.message}>{message && <p>{message}</p>}</div>
      <div className={styles.list}>
        <p className={styles.backup}>Copias de Seguridad</p>
        {error && <p className={styles.backupError}>{error}</p>}
        <ul>
          {backups.map((backup, index) => (
            <li key={index}>
              <strong>{backup.name}</strong> -{" "}
              {new Date(backup.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
