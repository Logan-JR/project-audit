import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/courses/curso/curso.module.css";
import { loadCurso } from "@/libs/data";
import Image from "next/image";
import { formatDate } from "@/utils/date";

const CursoPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, cursos } = await loadCurso(q, page);
  const viewDate = (date) => {
    const dateString = formatDate(date);
    const [year, month, day] = dateString.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
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
            <td>Detalle</td>
            <td>Carga</td>
            <td>Fecha de Inicio</td>
            <td>Hora</td>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso._id} className={styles.list}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={curso.flyer}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {curso.title}
                </div>
              </td>
              <td>{curso.detail}</td>
              <td>{`${curso.academicHours} h`}</td>
              <td>{viewDate(curso.startDate)}</td>
              <td>{curso.hour}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={curso.flyer} target="_blank">
                    <button className={`${styles.button} ${styles.view}`}>
                      Afiche
                    </button>
                  </Link>
                  <Link href={`/courses/curso/${curso._id}`}>
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

export default CursoPage;
