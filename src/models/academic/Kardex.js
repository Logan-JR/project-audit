import { Schema, model, models } from "mongoose";

const locationSchema = new Schema({
  pais: {
    type: String,
    trim: true,
    required: true,
  },
  departamento: {
    type: String,
    trim: true,
    required: true,
  },
  provincia: {
    type: String,
    trim: true,
    required: true,
  },
  localidad: {
    type: String,
    trim: true,
    required: true,
  },
});

const personalSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  paterno: {
    type: String,
    trim: true,
  },
  materno: {
    type: String,
    trim: true,
  },
  direccion: {
    type: String,
    trim: true,
  },
  celular: {
    type: String,
    trim: true,
  },
});

const studentSchema = new Schema({
  datos: {
    type: personalSchema,
    required: true,
  },
  ci: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  sexo: {
    type: String,
    trim: true,
    required: true,
  },
  estadoCivil: {
    type: String,
    trim: true,
    required: true,
  },
  ubicacion: {
    type: locationSchema,
    required: true,
  },
  correo: {
    type: String,
    trim: true,
  },
  zona: {
    type: String,
    trim: true,
    required: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  numDipBachiller: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

const educationsSchema = new Schema({
  colegio: {
    type: String,
    trim: true,
    required: true,
  },
  turno: {
    type: String,
    trim: true,
    required: true,
  },
  tipo: {
    type: String,
    trim: true,
    required: true,
  },
  area: {
    type: String,
    trim: true,
    required: true,
  },
  ubicacion: {
    type: locationSchema,
    required: true,
  },
  añoEgreso: {
    type: String,
    trim: true,
    required: true,
  },
});

const kardexSchema = new Schema(
  {
    student: {
      type: studentSchema,
      required: true,
    },
    parents: {
      type: personalSchema,
      required: true,
    },
    education: {
      type: educationsSchema,
      required: true,
    },
    carrera: {
      type: String,
      trim: true,
      required: true,
    },
    modIngreso: {
      type: String,
      trim: true,
      required: true,
    },
    gestion: {
      type: String,
      trim: true,
      required: true,
    },
    fileKardex: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Kardex || model("Kardex", kardexSchema);
