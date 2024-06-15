import Image from "next/image";
import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/cpa/log/log.module.css";
import { loadLog } from "@/libs/data";

const LogPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, log } = await loadLog(q, page);
  return (
    <div className={styles.container}>
      <h2>Bitacora</h2>
      <div className={styles.top}>
        <Search placeholder="Buscar..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Usuario</td>
            <td>Rol</td>
            <td>Accion</td>
            <td>Tabla</td>
            <td>Fecha</td>
            <td>Hora</td>
          </tr>
        </thead>
        <tbody>
          {log.map((log) => (
            <tr key={log._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={log.modifiedByUser.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {log.modifiedByUser.name}
                </div>
              </td>
              <td>{log.modifiedByUser.role}</td>
              <td>{log.operationType}</td>
              <td>{log.where}</td>
              <td>{log.modifiedDate.toLocaleDateString()}</td>
              <td>{log.modifiedDate.toLocaleTimeString()}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/cpa/logs/${log._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Ver Log
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default LogPage;
