import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/courses/inscription/inscription.module.css";
import { loadInscription } from "@/libs/data";

const InscriptionPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, inscription } = await loadInscription(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar CI" />
        <div className={styles.containerBtn}>
          <Link href="/courses/inscription/add">
            <button className={styles.addButton}>Agregar nuevo</button>
          </Link>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>CI</td>
            <td>Nombre</td>
            <td>Curso</td>
            <td>Modulos</td>
            <td>Correo</td>
            <td>Fecha Inscripcion</td>
          </tr>
        </thead>
        <tbody>
          {inscription.map((item) => (
            <tr key={item._id}>
              <td>
                <div className={styles.user}>{item.ci}</div>
              </td>
              <td
                className={styles.nameCap}
              >{`${item.name} ${item.paterno} ${item.materno}`}</td>
              <td>
                {item.course.map((e, i) => (
                  <div key={i} className={styles.course}>
                    <p>{e.course}</p>
                    <ul>
                      {e.modules.map((mod, j) => (
                        <li key={j}>{`${mod.name} Fecha: ${new Date(
                          mod.date
                        ).toLocaleDateString()} Horas: ${
                          mod.academicHours
                        }`}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </td>
              <td>{item.email}</td>
              <td>{item.createdAt.toLocaleDateString()}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/courses/inscription/${item.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Detalle
                    </button>
                  </Link>
                  <Link href={`/courses/inscription`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Confirmar
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

export default InscriptionPage;
