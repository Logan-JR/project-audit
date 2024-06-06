import { Schema, model, models } from "mongoose";

const datosSchema = new Schema({
  name: {
    type: String,
  },
  paterno: {
    type: String,
  },
  materno: {
    type: String,
  },
  direccion: {
    type: String,
  },
  celular: {
    type: String,
  },
});

const studentSchema = new Schema({
  datos: {
    type: datosSchema,
  },
  ci: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
  },
  pais: {
    type: String,
  },
  departamento: {
    type: String,
  },
  provincia: {
    type: String,
  },
  localidad: {
    type: String,
  },
  correo: {
    type: String,
  },
  zona: {
    type: String,
  },
  telefono: {
    type: String,
  },
  NumDipBachiller: {
    type: String,
  },
});

const educationsSchema = new Schema({
  colegio: {
    type: String,
  },
  turno: {
    type: String,
  },
  tipo: {
    type: String,
  },
  area: {
    type: String,
  },
  pais: {
    type: String,
  },
  departamento: {
    type: String,
  },
  provincia: {
    type: String,
  },
  localidad: {
    type: String,
  },
  egreso: {
    type: String,
  },
});

const kardexSchema = new Schema(
  {
    student: {
      type: studentSchema,
    },
    parents: {
      type: datosSchema,
    },
    education: {
      type: educationsSchema,
    },
    carrera: {
      type: String,
    },
    modIngreso: {
      type: String,
    },
    gestion: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Kardex || model("Kardex", kardexSchema);
