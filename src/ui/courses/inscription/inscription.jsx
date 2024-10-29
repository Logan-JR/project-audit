import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/courses/inscription/inscription.module.css";
import { loadInscription } from "@/libs/data";
import Confirmar from "./confirmar";

const InscriptionPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, inscription } = await loadInscription(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar CI" />
        {/* <div className={styles.containerBtn}>
          <Link href="/courses/inscription/add">
            <button className={styles.addButton}>Agregar nuevo</button>
          </Link>
        </div> */}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>CI</td>
            <td>Nombre</td>
            <td>Curso</td>
            <td>Correo</td>
            <td>Fecha Inscripcion</td>
          </tr>
        </thead>
        <tbody>
          {inscription.map((item) => (
            <Confirmar item={item} key={item._id} />
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default InscriptionPage;
