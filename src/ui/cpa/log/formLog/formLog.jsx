"use client";
import { useEffect, useState } from "react";
import styles from "@/ui/cpa/log/formLog/formLog.module.css";
import { useParams } from "next/navigation";
import Link from "next/link";

const FormLog = () => {
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
        <div className={styles.containerBtn}>
          <Link href={"/cpa/logs"}>
            <button className={styles.btn}>Atras</button>
          </Link>
        </div>
        <h3>Log</h3>
        <pre>{JSON.stringify(log, null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormLog;
