import { connectDB } from "@/libs/database";
import Inscription from "@/models/courses/Inscription";
import styles from "@/ui/courses/inscription/inscription.module.css";
import { revalidatePath } from "next/cache";

const Confirmar = ({ item }) => {
  const updateConfirmar = async (formData) => {
    "use server";
    const id = formData.get("itemId")?.toString();
    if (!id) return;
    connectDB();
    const found = await Inscription.findById(id);
    await Inscription.findByIdAndUpdate(
      id,
      { confirmado: !found.confirmado },
      {
        new: true,
      }
    );
    revalidatePath("/courses/inscription");
  };
  const getRecibo = async (formData) => {
    "use server";
    const id = formData.get("itemId")?.toString();
    // console.log("ID para el recibo", id);
  };
  return (
    <tr>
      <td>
        <div className={styles.user}>{item.ci}</div>
      </td>
      <td
        className={styles.nameCap}
      >{`${item.nombre} ${item.paterno} ${item.materno}`}</td>
      <td>{item.curso.title}</td>
      <td>{item.correo}</td>
      <td>{item.createdAt.toLocaleDateString()}</td>
      <td>
        <div className={styles.buttons}>
          <form action={updateConfirmar}>
            <input type="hidden" name="itemId" value={String(item._id)} />
            <button
              type="submit"
              className={`${styles.button} ${
                item.confirmado ? styles.view : styles.delete
              }`}
            >
              {item.confirmado ? "Confirmado" : "Confirmar?"}
            </button>
          </form>
          {item.confirmado && (
            <form action={getRecibo}>
              <input type="hidden" name="itemId" value={String(item._id)} />
              <button
                type="submit"
                className={`${styles.button} ${styles.view}`}
              >
                Recibo
              </button>
            </form>
          )}
        </div>
      </td>
    </tr>
  );
};

export default Confirmar;
