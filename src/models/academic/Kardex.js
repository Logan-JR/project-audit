import { Schema, model, models } from "mongoose";

const personalSchema = new Schema({
  name: {
    type: String,
  },
  paterno: {
    type: String,
  },
  materno: {
    type: String,
  },
  address: {
    type: String,
  },
  celular: {
    type: String,
  },
});

const studentSchema = new Schema({
  datos: {
    type: personalSchema,
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
  phone: {
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
      type: personalSchema,
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
    kardex: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Kardex || model("Kardex", kardexSchema);
