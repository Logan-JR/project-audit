import Image from "next/image";
import Link from "next/link";
import Search from "@/ui/dashboard/search/search";
import Pagination from "@/ui/dashboard/pagination/pagination";
import styles from "@/ui/cpa/post/post.module.css";
import { loadPost } from "@/libs/data";

const UserPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, post } = await loadPost(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Buscar..." />
        <Link href="/cpa/post/add">
          <button className={styles.addButton}>Agregar nuevo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Titulo</td>
            <td>Detalle</td>
            <td>Imagen</td>
            <td>Archivo</td>
          </tr>
        </thead>
        <tbody>
          {post.map((posts) => (
            <tr key={posts._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {posts.title}
                </div>
              </td>
              <td>{posts.detail}</td>
              <td>{posts.img}</td>
              <td>{posts.file}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/cpa/post/${posts._id}`}>
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

export default UserPage;
