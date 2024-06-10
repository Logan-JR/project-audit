"use client";
import { useEffect, useState } from "react";
import styles from "@/ui/cpa/bitacora/formBitacora/formBitacora.module.css";
import { useParams } from "next/navigation";

const FormBitacora = () => {
  const [log, setLog] = useState();
  const params = useParams();

  const getLog = async () => {
    try {
      const res = await fetch(`/api/cpa/log/${params.id}`);
      const data = await res.json();
      setLog(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) getLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3>Log</h3>
        <pre>{JSON.stringify(log, null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormBitacora;
