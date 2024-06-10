"use client";
import { useState, useEffect } from "react";
import styles from "@/ui/cpa/post/formPost/formPost.module.css";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";

const FormPost = () => {
  const [image, setImage] = useState("/noavatar.png");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const route = useRouter();
  const params = useParams();

  const getPost = async () => {
    const res = await fetch(`/api/cpa/post/${params.id}`);
    const data = await res.json();
    setImage(`/image/${watch("img")}`);
    reset({
      title: data.title,
      detail: data.detail,
      img: data.img,
      file: data.file,
    });
  };
  const createUser = async (p) => {
    try {
      const formData = new FormData();
      formData.append("title", p.title);
      formData.append("detail", p.detail);
      formData.append("img", p.img[0]);
      formData.append("file", p.file[0]);
      const res = await fetch("/api/cpa/post", {
        method: "POST",
        body: formData,
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

  const updatePost = async (p) => {
    try {
      const formData = new FormData();
      formData.append("title", p.title);
      formData.append("detail", p.detail);
      formData.append("img", typeof p.img !== "string" ? p.img[0] : p.img);
      formData.append("file", typeof p.file !== "string" ? p.file[0] : p.file);
      const res = await fetch(`/api/cpa/post/${params.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = res.json();
      if (res.status === 200) {
        route.push("/cpa/post");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
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

  const onSubmit = async (e) => {
    if (!params.id) await createUser(e);
    else {
      updatePost(e);
    }
  };

  const handleError = () => {
    setImage("/noavatar.png");
  };

  const handleImage = (e) => {
    if (!params.id) {
      if (e.target.files[0]) return setImage(URL.createObjectURL(e.target.files[0]));
    }
    if (watch("img")[0]) return setImage(URL.createObjectURL(watch("img")[0]));
    return setImage("/noavatar.png");
  };

  useEffect(() => {
    if (params.id) getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={image}
            alt=""
            width={300}
            height={300}
            onError={handleError}
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <label>Titulo</label>
          <input
            type="text"
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
            })}
          />
          {errors.title && <span>{errors.title.message}</span>}
          <label>Detalle</label>
          <input
            type="text"
            {...register("detail", {
              minLength: {
                value: 3,
                message: "El detalle ingresado es demasiado corto",
              },
              maxLength: {
                value: 40,
                message: "El detalle es demasiado largo",
              },
            })}
          />
          {errors.detail && <span>{errors.detail.message}</span>}
          <label>Imagen</label>
          <input
            type="file"
            accept="image/*"
            {...register("img", {
              onChange: handleImage,
            })}
          />
          {errors.img && <span>{errors.img.message}</span>}
          <label>Archivo</label>
          <input type="file" accept=".pdf" {...register("file")} />
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
