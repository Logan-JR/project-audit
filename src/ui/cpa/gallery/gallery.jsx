import Image from "next/image";
import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/cpa/gallery/gallery.module.css";
import { loadGallery } from "@/libs/data";

const Gallery = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, gallery } = await loadGallery(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar..." />
        <Link href="/cpa/gallery/add">
          <button className={styles.addButton}>Subir Imagen</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Imagen</td>
            <td>Detalle</td>
            <td>Fecha</td>
          </tr>
        </thead>
        <tbody>
          {gallery.map((posts) => (
            <tr key={posts._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={posts.img}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                </div>
              </td>
              <td>{posts.detail}</td>
              <td>{posts.createdAt.toLocaleDateString()}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/cpa/gallery/${posts._id}`}>
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

export default Gallery;
