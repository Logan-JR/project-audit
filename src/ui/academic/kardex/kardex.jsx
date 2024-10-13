import Image from "next/image";
import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/academic/kardex/kardex.module.css";
import { loadKardexs } from "@/libs/data";

const KardexPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, kardexs } = await loadKardexs(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar..." />
        <Link href="/academic/students/add">
          <button className={styles.addButton}>Agregar nuevo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Estudiante</td>
            <td>CI</td>
            <td>Creado en</td>
            <td>Actualizado en</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {kardexs.map((k) => (
            <tr key={k._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={k.img || "/audit-05.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {`${k.student.datos.nombre} ${k.student.datos.paterno} ${k.student.datos.materno}`}
                </div>
              </td>
              <td>{k.student.ci}</td>
              <td>{k.createdAt.toLocaleDateString()}</td>
              <td>{k.updatedAt.toLocaleDateString()}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={k.fileKardex} target="_blank">
                    <button
                      className={`${styles.button} ${styles.view}
                      ${k.fileKardex === "" ? styles.pdfError : ""}`}
                      disabled={`${k.fileKardex === "" ? styles.pdfError : ""}`}
                    >
                      PDF
                    </button>
                  </Link>
                  <Link href={`/academic/students/${k._id}`}>
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
      <Pagination count={count} />
    </div>
  );
};

export default KardexPage;
