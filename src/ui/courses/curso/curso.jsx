import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/courses/curso/curso.module.css";
import { loadCurso } from "@/libs/data";

const CursoPage = async () => {
  const listCursos = await loadCurso();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar Curso..." />
        <Link href="/courses/curso/add">
          <button className={styles.addButton}>Agregar nuevo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Curso</td>
            <td>Horas Academicas</td>
            <td>Modulos</td>
            <td>Fecha</td>
          </tr>
        </thead>
        <tbody>
          {listCursos.map((curso) => (
            <tr key={curso._id}>
              <td>
                <div className={styles.user}>{curso.curso}</div>
              </td>
              <td>{curso.horasAcademicas}</td>
              <td>{curso.modulo}</td>
              <td>{curso.fecha}</td>
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
      <Pagination />
    </div>
  );
};

export default CursoPage;