import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/courses/curso/curso.module.css";
import { loadCurso } from "@/libs/data";

const CursoPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, cursos } = await loadCurso(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar..." />
        <Link href="/courses/curso/add">
          <button className={styles.addButton}>Agregar nuevo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Curso</td>
            <td>Modulo</td>
            <td>Horas</td>
            <td>Fecha de Inicio</td>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso._id} className={styles.list}>
              <td>
                <div className={styles.user}>{curso.course}</div>
              </td>
              <td>
                {curso.modules.map((mod) => (
                  <ul key={mod._id}>
                    <li>{mod.name}</li>
                  </ul>
                ))}
              </td>
              <td>
                {curso.modules.map((mod) => (
                  <ul key={mod._id}>
                    <li>{mod.academicHours}</li>
                  </ul>
                ))}
              </td>
              <td>
                {curso.modules.map((mod) => (
                  <ul key={mod._id}>
                    <li>{mod.date.toLocaleDateString()}</li>
                  </ul>
                ))}
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/courses/curso/${curso._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Detalle
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

export default CursoPage;
