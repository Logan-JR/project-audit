import Image from "next/image";
import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/academic/kardex/kardex.module.css";
import { loadKardexs } from "@/libs/data";

const KardexPage = async () => {
  const listKardexs = await loadKardexs();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar Kardex..." />
        <Link href="/academic/students/add">
          <button className={styles.addButton}>Agregar nuevo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>RU</td>
            <td>CI</td>
            <td>Estudiante</td>
            <td>Creado en</td>
            <td>Actualizado en</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {listKardexs.map((kardex) => (
            <tr key={kardex._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={kardex.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {kardex.ru}
                </div>
              </td>
              <td>{kardex.ci}</td>
              <td>{`${kardex.nombre} ${kardex.apellidoPaterno} ${kardex.apellidoMaterno}`}</td>
              <td>{kardex.createdAt.toString().slice(0, 15)}</td>
              <td>{kardex.updatedAt.toString().slice(0, 15)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/academic/students/${kardex.id}`}>
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

export default KardexPage;
