"use client";
import styles from "@/ui/academic/kardex/formKardex/formKardex.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatDate } from "@/utils/date";

const FormKardex = () => {
  const params = useParams();
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const getKardex = async () => {
    try {
      const res = await fetch(`/api/academic/kardex/${params.id}`);
      if (!res.ok) throw new Error("Error fetching kardex data");
      const data = await res.json();
      const {
        student: {
          datos: { nombre, paterno, materno, direccion, celular },
          ci,
          fechaNacimiento,
          sexo,
          estadoCivil,
          ubicacion: studentUbicacion,
          correo,
          zona,
          telefono,
          numDipBachiller,
        },
        parents: {
          nombre: parentNombre,
          paterno: parentPaterno,
          materno: parentMaterno,
          direccion: parentDireccion,
          celular: parentCelular,
        },
        education: {
          colegio,
          turno,
          tipo,
          area,
          ubicacion: educationUbicacion,
          añoEgreso,
        },
        carrera,
        modIngreso,
        gestion,
        fileKardex,
      } = data;
      reset({
        student: {
          datos: { nombre, paterno, materno, direccion, celular },
          ci,
          fechaNacimiento: formatDate(fechaNacimiento),
          sexo,
          estadoCivil,
          ubicacion: studentUbicacion,
          correo,
          zona,
          telefono,
          numDipBachiller,
        },
        parents: {
          nombre: parentNombre,
          paterno: parentPaterno,
          materno: parentMaterno,
          direccion: parentDireccion,
          celular: parentCelular,
        },
        education: {
          colegio,
          turno,
          tipo,
          area,
          ubicacion: educationUbicacion,
          añoEgreso,
        },
        carrera,
        modIngreso,
        gestion,
        fileKardex,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createKardex = async (kardex) => {
    setLoading(true);
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
    appendFormData(kardex);
    try {
      const res = await fetch("/api/academic/kardex", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.status === 200) {
        setLoading(false);
        route.push("/academic/students");
        route.refresh();
      } else setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateKardex = async (kardex) => {
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
    appendFormData(kardex);
    try {
      const res = await fetch(`/api/academic/kardex/${params.id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        route.push("/academic/students");
        route.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteKardex = async () => {
    if (window.confirm("Estas seguro de querer borrar este kardex?")) {
      try {
        const res = await fetch(`/api/academic/kardex/${params.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          route.push("/academic/students");
          route.refresh();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = handleSubmit((e) => {
    if (!params.id) createKardex(e);
    else updateKardex(e);
  });

  useEffect(() => {
    if (params.id) getKardex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/audit-03.png"} alt="" width={300} height={300} />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={`${styles.top}`}>
            <div className={styles.containerColumn}>
              <label>CI</label>
              <input
                {...register("student.ci", {
                  required: { value: true, message: "El CI es requerido" },
                  minLength: {
                    value: 7,
                    message: "El CI es demasiado corto",
                  },
                  maxLength: {
                    value: 12,
                    message: "El CI es demasiado largo",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Caracteres no validos",
                  },
                })}
              />
              {errors.student?.ci && <span>{errors.student?.ci.message}</span>}
            </div>
            <div className={styles.containerColumn}>
              <label>Gestión</label>
              <input
                type="text"
                {...register("gestion", {
                  required: { value: true, message: "La gestión es requerida" },
                  pattern: {
                    value: /^(0[1-2])\/(19[0-9]{2}|20[0-9]{2}|2100)$/,
                    message: "Formato incorrecto. Debe ser 01/AAAA o 02/AAAA",
                  },
                })}
              />
              {errors.gestion && <span>{errors.gestion.message}</span>}
            </div>
            <div className={styles.containerColumn}>
              <label>Archivo Kardex</label>
              <input
                type="file"
                accept=".pdf"
                {...register("fileKardex", {
                  required: {
                    value: !params.id ? true : false,
                    message: "El archivo es requerido",
                  },
                })}
              />
              {errors.fileKardex && <span>{errors.fileKardex.message}</span>}
            </div>
          </div>
          <h3 className={styles.title}>Datos Personales</h3>
          <div className={styles.containerRow}>
            <div className={""}>
              <div className={styles.containerColumn}>
                <label>Nombre</label>
                <input
                  {...register("student.datos.nombre", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El nombre es demasiado corto",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Caracter no valido",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "No se puede enviar un dato vacio",
                  })}
                />
                {errors.student?.datos?.nombre && (
                  <span>{errors.student?.datos?.nombre.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Apellido Paterno</label>
                <input
                  {...register("student.datos.paterno", {
                    required: {
                      value: !watch("student.datos.materno"),
                      message: "El apellido es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El apellido es demasiado corto",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Caracter no valido",
                    },
                    validate: (value) =>
                      value.trim() === "" &&
                      watch("student.datos.materno").trim() === ""
                        ? "Apellido paterno vacio"
                        : true,
                  })}
                />
                {errors.student?.datos?.paterno && (
                  <span>{errors.student?.datos?.paterno.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Apellido Materno</label>
                <input
                  {...register("student.datos.materno", {
                    required: {
                      value: !watch("student.datos.paterno"),
                      message: "El apellido es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El apellido es demasiado corto",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Caracter no valido",
                    },
                    validate: (value) =>
                      value.trim() === "" &&
                      watch("student.datos.paterno").trim() === ""
                        ? "Apellido materno vacio"
                        : true,
                  })}
                />
                {errors.student?.datos?.materno && (
                  <span>{errors.student?.datos?.materno.message}</span>
                )}
              </div>
            </div>
            <div className={""}>
              <div className={styles.containerColumn}>
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  {...register("student.fechaNacimiento", {
                    required: {
                      value: true,
                      message: "La fecha de nacimiento es requerida",
                    },
                    validate: (f) => {
                      const fechaIngresada = new Date(f);
                      const fechaActual = new Date();
                      const fechaMinima = new Date(
                        fechaActual.getFullYear() - 14,
                        fechaActual.getMonth(),
                        fechaActual.getDate()
                      );

                      if (fechaIngresada > fechaActual) {
                        return "No se permiten fechas futuras";
                      }

                      if (fechaIngresada > fechaMinima) {
                        return "La edad del estudiante es menor a 14 años";
                      }

                      return true;
                    },
                  })}
                />
                {errors.student?.fechaNacimiento && (
                  <span>{errors.student?.fechaNacimiento.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Sexo</label>
                <select
                  {...register("student.sexo", {
                    required: { value: true, message: "Elija una opción" },
                  })}
                >
                  <option value="">Elegir</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
                {errors.student?.sexo && (
                  <span>{errors.student?.sexo.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Estado Civil</label>
                <select
                  {...register("student.estadoCivil", {
                    required: {
                      value: true,
                      message: "Elija una opción",
                    },
                  })}
                >
                  <option value="">Elegir</option>
                  <option value="soltero">Soltero</option>
                  <option value="casado">Casado</option>
                  <option value="divorciado">Divorciado</option>
                </select>
                {errors.student?.estadoCivil && (
                  <span>{errors.student?.estadoCivil.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.containerRow}>
            <div>
              <div className={styles.containerColumn}>
                <label>País</label>
                <input
                  {...register("student.ubicacion.pais", {
                    required: { value: true, message: "Ingrese el pais" },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Caracter no valido",
                    },
                  })}
                />
                {errors.student?.ubicacion?.pais && (
                  <span>{errors.student?.ubicacion?.pais.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Departamento</label>
                <input
                  {...register("student.ubicacion.departamento", {
                    required: {
                      value: true,
                      message: "Ingrese el departamento",
                    },
                  })}
                />
                {errors.student?.ubicacion?.departamento && (
                  <span>{errors.student?.ubicacion?.departamento.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Provincia</label>
                <input
                  {...register("student.ubicacion.provincia", {
                    required: {
                      value: true,
                      message: "Ingrese la provincia",
                    },
                  })}
                />
                {errors.student?.ubicacion?.provincia && (
                  <span>{errors.student?.ubicacion?.provincia.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Localidad</label>
                <input
                  {...register("student.ubicacion.localidad", {
                    required: { value: true, message: "Ingrese la localidad" },
                  })}
                />
                {errors.student?.ubicacion?.localidad && (
                  <span>{errors.student?.ubicacion?.localidad.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Correo</label>
                <input
                  type="email"
                  {...register("student.correo", {
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
                      message: "El correo no es valido",
                    },
                  })}
                />
                {errors.student?.correo && (
                  <span>{errors.student?.correo.message}</span>
                )}
              </div>
            </div>
            <div>
              <div className={styles.containerColumn}>
                <label>Dirección</label>
                <input
                  {...register("student.datos.direccion", {
                    required: {
                      value: true,
                      message: "La dirección es requerida",
                    },
                    pattern: {
                      value: /^[A-Za-z0-9\s\/\.]+$/,
                      message: "Caracter no valido",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "No se puede enviar un dato vacio",
                  })}
                />
                {errors.student?.datos?.direccion && (
                  <span>{errors.student?.datos?.direccion.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Celular</label>
                <input
                  {...register("student.datos.celular", {
                    minLength: {
                      value: 7,
                      message: "El numero es demasiado corto",
                    },
                    pattern: {
                      value: /^[0-9-]+$/,
                      message: "Caracteres no validos",
                    },
                  })}
                />
                {errors.student?.datos?.celular && (
                  <span>{errors.student?.datos?.celular.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Zona</label>
                <input
                  {...register("student.zona", {
                    required: { value: true, message: "Ingrese la zona" },
                    pattern: {
                      value: /^[a-zA-Z0-9\s]+$/,
                      message: "Caracteres no validos",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "No se puede enviar un dato vacio",
                  })}
                />
                {errors.student?.zona && (
                  <span>{errors.student?.zona.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Teléfono</label>
                <input
                  {...register("student.telefono", {
                    minLength: {
                      value: 7,
                      message: "El numero es demasiado corto",
                    },
                    pattern: {
                      value: /^[0-9-]+$/,
                      message: "Caracteres no validos",
                    },
                  })}
                />
                {errors.student?.telefono && (
                  <span>{errors.student?.telefono.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Número de Diploma de Bachiller</label>
                <input
                  {...register("student.numDipBachiller", {
                    required: {
                      value: true,
                      message: "Ingrese el numero del diploma de bachiller",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Caracteres no validos",
                    },
                  })}
                />
                {errors.student?.numDipBachiller && (
                  <span>{errors.student?.numDipBachiller.message}</span>
                )}
              </div>
            </div>
          </div>

          <h3 className={styles.title}>Datos de los Padres o Apoderado</h3>
          <div className={styles.containerRow}>
            <div>
              <div className={styles.containerColumn}>
                <label>Nombre</label>
                <input
                  {...register("parents.nombre", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El nombre es demasiado corto",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Caracter no valido",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "No se puede enviar un dato vacio",
                  })}
                />
                {errors.parents?.nombre && (
                  <span>{errors.parents?.nombre.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Apellido Paterno</label>
                <input
                  {...register("parents.paterno", {
                    required: {
                      value: !watch("parents.materno"),
                      message: "El apellido es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El apellido es demasiado corto",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Caracter no valido",
                    },
                    validate: (value) =>
                      value.trim() === "" &&
                      watch("parents.materno").trim() === ""
                        ? "Apellido paterno vacio"
                        : true,
                  })}
                />
                {errors.parents?.paterno && (
                  <span>{errors.parents?.paterno.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Apellido Materno</label>
                <input
                  {...register("parents.materno", {
                    required: {
                      value: !watch("parents.paterno"),
                      message: "El apellido es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El apellido es demasiado corto",
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Caracter no valido",
                    },
                    validate: (value) =>
                      value.trim() === "" &&
                      watch("parents.paterno").trim() === ""
                        ? "Apellido materno vacio"
                        : true,
                  })}
                />
                {errors.parents?.materno && (
                  <span>{errors.parents?.materno.message}</span>
                )}
              </div>
            </div>
            <div>
              <div className={styles.containerColumn}>
                <label>Dirección</label>
                <input
                  {...register("parents.direccion", {
                    pattern: {
                      value: /^[A-Za-z0-9\s\/\.]+$/,
                      message: "Caracter no valido",
                    },
                  })}
                />
                {errors.parents?.direccion && (
                  <span>{errors.parents?.direccion.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Celular</label>
                <input
                  {...register("parents.celular", {
                    minLength: {
                      value: 7,
                      message: "El numero es demasiado corto",
                    },
                    pattern: {
                      value: /^[0-9-]+$/,
                      message: "Caracteres no validos",
                    },
                  })}
                />
                {errors.parents?.celular && (
                  <span>{errors.parents?.celular.message}</span>
                )}
              </div>
            </div>
          </div>
          <h3 className={styles.title}>Datos de procedencia educativa</h3>
          <div className={styles.containerRow}>
            <div>
              <div className={styles.containerColumn}>
                <label>Colegio</label>
                <input
                  {...register("education.colegio", {
                    required: {
                      value: true,
                      message: "El colegio es requerido",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "No se puede enviar un dato vacio",
                  })}
                />
                {errors.education?.colegio && (
                  <span>{errors.education?.colegio.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Turno</label>
                <select
                  {...register("education.turno", {
                    required: { value: true, message: "El turno es requerido" },
                  })}
                >
                  <option value="">Elegir</option>
                  <option value="diurno">Diurno</option>
                  <option value="tarde">Tarde</option>
                  <option value="nocturno">Nocturno</option>
                </select>
                {errors.education?.turno && (
                  <span>{errors.education?.turno.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Tipo</label>
                <select
                  {...register("education.tipo", {
                    required: { value: true, message: "Elegir tipo" },
                  })}
                >
                  <option value="">Elegir</option>
                  <option value="fiscal">Fiscal</option>
                  <option value="privado">Privado</option>
                  <option value="convenio">Convenio</option>
                </select>
                {errors.education?.tipo && (
                  <span>{errors.education?.tipo.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Área</label>
                <select
                  {...register("education.area", {
                    required: { value: true, message: "Elegir area" },
                  })}
                >
                  <option value="">Elegir</option>
                  <option value="urbana">Urbana</option>
                  <option value="rural">Rural</option>
                </select>
                {errors.education?.area && (
                  <span>{errors.education?.area.message}</span>
                )}
              </div>
            </div>
            <div>
              <div className={styles.containerColumn}>
                <label>País</label>
                <input
                  {...register("education.ubicacion.pais", {
                    required: { value: true, message: "El pais es requerido" },
                  })}
                />
                {errors.education?.ubicacion?.pais && (
                  <span>{errors.education?.ubicacion?.pais.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Departamento</label>
                <input
                  {...register("education.ubicacion.departamento", {
                    required: {
                      value: true,
                      message: "El departamento es requerido",
                    },
                  })}
                />
                {errors.education?.ubicacion?.departamento && (
                  <span>
                    {errors.education?.ubicacion?.departamento.message}
                  </span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Provincia</label>
                <input
                  {...register("education.ubicacion.provincia", {
                    required: {
                      value: true,
                      message: "La provincia en requerida",
                    },
                  })}
                />
                {errors.education?.ubicacion?.provincia && (
                  <span>{errors.education?.ubicacion?.provincia.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Localidad</label>
                <input
                  {...register("education.ubicacion.localidad", {
                    required: {
                      value: true,
                      message: "La localidad es requerida",
                    },
                  })}
                />
                {errors.education?.ubicacion?.localidad && (
                  <span>{errors.education?.ubicacion?.localidad.message}</span>
                )}
              </div>
              <div className={styles.containerColumn}>
                <label>Año de Egreso</label>
                <input
                  type="text"
                  {...register("education.añoEgreso", {
                    required: {
                      value: true,
                      message: "El año de egreso es requerido",
                    },
                    pattern: {
                      value: /^(19[0-9]{2}|20[0-9]{2}|2100)$/,
                      message: "Formato de año AAAA",
                    },
                  })}
                />
                {errors.education?.añoEgreso && (
                  <span>{errors.education?.añoEgreso.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.containerRow}>
            <div>
              <h3>Carrera</h3>
              <div className={styles.containerColumn}>
                <label>Carrera</label>
                <select
                  {...register("carrera", {
                    required: {
                      value: true,
                      message: "Elegir carrera",
                    },
                  })}
                >
                  <option value="">Elegir</option>
                  <option value="auditoria contaduria-publica">
                    Auditoria Contaduria-Publica
                  </option>
                </select>
                {errors.carrera && <span>{errors.carrera.message}</span>}
              </div>
            </div>
            <div>
              <h3>Modalidad de Ingreso</h3>
              <div className={styles.containerColumn}>
                <label>Modo de Ingreso</label>
                <select
                  {...register("modIngreso", {
                    required: {
                      value: true,
                      message: "Elegir modalidad de ingreso",
                    },
                  })}
                >
                  <option value="">Elegir</option>
                  <option value="psa">PSA</option>
                  <option value="excelencia academica">
                    Excelencia Academica
                  </option>
                  <option value="excelencia deportiva">
                    Excelencia Deportiva
                  </option>
                </select>
                {errors.modIngreso && <span>{errors.modIngreso.message}</span>}
              </div>
            </div>
          </div>

          <div>
            <button type="submit">{!params.id ? "Crear" : "Actualizar"}</button>
            {!params.id ? (
              ""
            ) : (
              <button
                className={styles.delete}
                type="button"
                onClick={deleteKardex}
              >
                Borrar
              </button>
            )}
            <Link href={"/academic/students"}>
              <button>Cancelar</button>
            </Link>
          </div>
        </form>
        {loading && <div>Cargando, por favor espere...</div>}
      </div>
    </div>
  );
};

export default FormKardex;
