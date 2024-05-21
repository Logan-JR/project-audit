import Image from "next/image";
import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/cpa/bitacora/bitacora.module.css";
import { loadBitacora } from "@/libs/data";

const BitacoraPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, bitacora } = await loadBitacora(q, page);
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
            <td>Fecha</td>
            <td>Hora</td>
          </tr>
        </thead>
        <tbody>
          {bitacora.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.modifiedByUser.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.modifiedByUser.username}
                </div>
              </td>
              <td>{user.modifiedByUser.role}</td>
              <td>{user.operationType}</td>
              <td>{user.log.wallTime.toDateString()}</td>
              <td>{user.log.wallTime.toLocaleTimeString()}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={""}>
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

export default BitacoraPage;
