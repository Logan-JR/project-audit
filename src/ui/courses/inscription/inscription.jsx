import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/courses/inscription/inscription.module.css";
import { loadInscription } from "@/libs/data";

const UserPage = async () => {
  const list = await loadInscription();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar..." />
        <Link
          href={`https://docs.google.com/spreadsheets/d/${process.env.DOCUMENT_ID}/edit?usp=sharing`}
        >
          <button className={styles.addButton}>Ver</button>
        </Link>
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
          {list.map((item) => (
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
      <Pagination />
    </div>
  );
};

export default UserPage;
