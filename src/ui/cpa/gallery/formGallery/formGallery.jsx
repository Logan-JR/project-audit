"use client";
import { useState, useEffect } from "react";
import styles from "@/ui/cpa/post/formPost/formPost.module.css";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

const FormGallery = () => {
  const [image, setImage] = useState("/noavatar.png");
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const route = useRouter();
  const params = useParams();

  const getGallery = async () => {
    const res = await fetch(`/api/cpa/gallery/${params.id}`);
    const data = await res.json();
    setImage(data.img);
    reset({
      detail: data.detail,
      img: data.img,
    });
  };

  const logGallery = async (type, date, object) => {
    try {
      if (status === "authenticated") {
        const { img, fullname, role, status } = session.user;
        const res = await fetch("/api/cpa/log", {
          method: "POST",
          body: JSON.stringify({
            modifiedByUser: { img, name: fullname, role, status },
            operationType: type,
            where: "GALLERY",
            modifiedDate: date,
            modifiedObject: object,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createImage = async (p) => {
    try {
      const formData = new FormData();
      const appendFormData = (data, root = "") => {
        for (let key in data) {
          const value = data[key];
          const formKey = root ? `${root}[${key}]` : key;
          if (value && typeof value === "object" && !(value instanceof File)) {
            appendFormData(value, formKey);
          } else {
            formData.append(formKey, value);
          }
        }
      };
      appendFormData(p);
      const res = await fetch("/api/cpa/gallery", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        await logGallery("INSERT", data.createdAt, data);
        route.push("/cpa/gallery");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = async (p) => {
    try {
      const formData = new FormData();
      const appendFormData = (data, root = "") => {
        for (let key in data) {
          const value = data[key];
          const formKey = root ? `${root}[${key}]` : key;
          if (value && typeof value === "object" && !(value instanceof File)) {
            appendFormData(value, formKey);
          } else {
            formData.append(formKey, value);
          }
        }
      };
      appendFormData(p);
      const res = await fetch(`/api/cpa/gallery/${params.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        await logGallery("UPDATE", data.updatedAt, data);
        route.push("/cpa/gallery");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Estas seguro de querer eliminar esta imagen?")) {
      try {
        const res = await fetch(`/api/cpa/gallery/${params.id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (res.ok) {
          await logGallery("DELETE", new Date(), data);
          route.push("/cpa/gallery");
          route.refresh();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = async (e) => {
    if (!params.id) await createImage(e);
    else {
      updateImage(e);
    }
  };

  const handleError = () => {
    setImage("/noavatar.png");
  };

  const handleImage = (e) => {
    if (!params.id) {
      if (e.target.files[0])
        return setImage(URL.createObjectURL(e.target.files[0]));
    }
    if (watch("img")[0]) return setImage(URL.createObjectURL(watch("img")[0]));
    return setImage("/noavatar.png");
  };

  useEffect(() => {
    if (params.id) getGallery();
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
              required: {
                value: image != "" ? true : false,
                message: "La imagen es requerida",
              },
              onChange: handleImage,
            })}
          />
          {errors.img && <span>{errors.img.message}</span>}
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
            <Link href={"/cpa/gallery"}>
              <button>Cancelar</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormGallery;
