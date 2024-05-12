import Image from "next/image";
import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/cpa/users/users.module.css";
import { loadUsers } from "@/libs/data";

const UserPage = async () => {
  const listUsers = await loadUsers();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar usuario..." />
        <Link href="/cpa/users/add">
          <button className={styles.addButton}>Agregar nuevo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Correo</td>
            <td>Creado en</td>
            <td>Rol</td>
            <td>Estado</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt.toString().slice(0, 15)}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/cpa/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Ver
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UserPage;
