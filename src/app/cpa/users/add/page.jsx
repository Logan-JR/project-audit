import styles from "@/ui/dashboard/users/formUser/formUser.module.css";
import Image from "next/image";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        <input type="file" />
        <p>John Rivera</p>
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Username</label>
          <input type="text" name="username" placeholder="John Rivera" />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="johnrivera@correo.com"
          />
          <label>Password</label>
          <input type="password" name="password" placeholder="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder="+123 12345678" />
          <label>Address</label>
          <input type="text" name="address" placeholder="Villa Imperial City" />
          <label>Choose a Rol</label>
          <select name="category" id="category">
            <option value="">Administrador</option>
            <option value="">Secretario Administrativo</option>
            <option value="">Responsable Cursos</option>
          </select>
          <label>Status</label>
          <select name="status" id="status">
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
