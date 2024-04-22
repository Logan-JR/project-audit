"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/ui/dashboard/users/formUser/formUser.module.css";
import { useRouter, useParams } from "next/navigation";

const FormUser = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
    status: "activo",
    img: `https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 826) + 1}.jpeg`,
  });

  const route = useRouter();
  const params = useParams();

  const getUser = async () => {
    const res = await fetch(`/api/cpa/users/${params.id}`);
    const data = await res.json();
    setNewUser({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
      status: data.status,
      img: data.img,
    });
  };

  const createUser = async () => {
    try {
      const res = await fetch("/api/cpa/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        route.push("/cpa/users");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      const res = await fetch(`/api/cpa/users/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      route.push("/cpa/users");
      route.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`/api/cpa/users/${params.id}`, {
          method: "DELETE",
        });
        route.push("/cpa/users");
        route.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!params.id) await createUser();
    else {
      updateUser();
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (params.id) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={newUser.img || "/noavatar.png"} alt="" width={300} height={300}/>
        </div>
        {newUser.name}
      </div>
      <div className={styles.formContainer}>
        <form action={handleSubmit} className={styles.form}>
          <label>Username</label>
          <input
            type="text"
            name="name"
            placeholder="username"
            onChange={handleChange}
            value={newUser.name}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="user@email.com"
            onChange={handleChange}
            value={newUser.email}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={newUser.password}
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="+591 12345678"
            onChange={handleChange}
            value={newUser.phone}
          />
          <label>Choose a Rol</label>
          <select
            name="role"
            id="role"
            onChange={handleChange}
            value={newUser.role}
          >
            <option value="admin">Administrador</option>
            <option value="secretario">Secretario</option>
            <option value="cursos">Responsable Cursos</option>
          </select>
          <label>Status</label>
          <select
            name="status"
            id="status"
            onChange={handleChange}
            value={newUser.status}
          >
            <option value="active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit">{!params.id ? "Create" : "Update"}</button>
          {!params.id ? (
            ""
          ) : (
            <button
              className={styles.delete}
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormUser;
