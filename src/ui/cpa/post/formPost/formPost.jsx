"use client";
import { useState, useEffect } from "react";
import styles from "@/ui/cpa/post/formPost/formPost.module.css";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

const FormPost = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [newPost, setNewPost] = useState({
    title: "",
    detail: "",
    img: "",
    file: "",
  });
  const route = useRouter();
  const params = useParams();

  const getPost = async () => {
    const res = await fetch(`/api/cpa/post/${params.id}`);
    const data = await res.json();
    setNewPost({
      title: data.title,
      detail: data.detail,
      img: data.img,
      file: data.file,
    });
    setValue("title", data.title);
    setValue("detail", data.detail);
    setValue("img", data.img);
    setValue("file", data.file);
  };

  const createUser = async () => {
    try {
      const res = await fetch("/api/cpa/post", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        route.push("/cpa/post");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async () => {
    try {
      const res = await fetch(`/api/cpa/post/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      route.push("/cpa/post");
      route.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const resUp = await fetch(`/api/cpa/post/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(newPost),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await fetch(`/api/cpa/post/${params.id}`, {
          method: "DELETE",
        });
        route.push("/cpa/post");
        route.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = async () => {
    if (!params.id) await createUser();
    else {
      updatePost();
    }
  };

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (params.id) getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <label>Titulo</label>
          <input
            type="text"
            value={newPost.name}
            {...register("title", {
              required: { value: true, message: "El titulo es requerido" },
              minLength: {
                value: 3,
                message: "El titulo ingresado es demasiado corto",
              },
              maxLength: {
                value: 40,
                message: "El titulo es demasiado largo",
              },
              onChange: handleChange,
            })}
          />
          {errors.title && <span>{errors.title.message}</span>}
          <label>Detalle</label>
          <input
            type="text"
            value={newPost.detail}
            {...register("detail", {
              minLength: {
                value: 3,
                message: "El detalle ingresado es demasiado corto",
              },
              maxLength: {
                value: 40,
                message: "El detalle es demasiado largo",
              },
              onChange: handleChange,
            })}
          />
          {errors.detail && <span>{errors.detail.message}</span>}
          <label>Imagen</label>
          <input
            type="file"
            accept="image/*"
            {...register("img", {
              required: {
                value: true,
                message: "La imagen es requerida",
              },
              onChange: handleChange,
            })}
          />
          {errors.img && <span>{errors.img.message}</span>}
          <label>Archivo</label>
          <input
            type="file"
            accept=".pdf"
            {...register("file", {
              onChange: handleChange,
            })}
          />
          {errors.file && <span>{errors.file.message}</span>}
          <div>
            <button type="submit">{!params.id ? "Crear" : "Actualizar"}</button>
            {!params.id ? (
              ""
            ) : (
              <button
                className={styles.delete}
                type="button"
                onClick={handleDelete}
              >
                Borrar
              </button>
            )}
            <Link href={"/cpa/post"}>
              <button>Cancelar</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPost;
