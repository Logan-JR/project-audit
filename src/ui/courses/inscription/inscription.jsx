import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/courses/inscription/inscription.module.css";
import { loadInscription } from "@/libs/data";

const UserPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, inscription } = await loadInscription(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar CI" />
        <div className={styles.containerBtn}>
          <button className={styles.addButton}>Sincronizar</button>
          <Link
            href={`https://docs.google.com/spreadsheets/d/${process.env.DOCUMENT_ID}/edit?usp=sharing`}
            target="_blank"
          >
            <button className={styles.addButton}>Ver</button>
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
            <td>Estado</td>
          </tr>
        </thead>
        <tbody>
          {inscription.map((item) => (
            <tr key={item._id}>
              <td>
                <div className={styles.user}>{item.ci}</div>
              </td>
              <td>{`${item.name} ${item.paterno} ${item.materno}`}</td>
              <td>{item.course}</td>
              <td>{item.modules}</td>
              <td>{item.email}</td>
              <td>{item.inscriptionDate}</td>
              <td>
                <button className={`${styles.button} ${styles.view}`}>
                  Confirmar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UserPage;
