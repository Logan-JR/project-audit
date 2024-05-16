import { connectDB } from "@/libs/database";
import User from "@/models/cpa/User";
import Kardex from "@/models/academic/Kardex";
import Bitacora from '@/models/cpa/Bitacora'
import Curso from '@/models/courses/Curso'

export const loadUsers = async () => {
  try {
    connectDB();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const loadKardexs = async (q) => {
  const regex = new RegExp(q, "i");
  try {
    connectDB();
    const kardexs = await Kardex.find({ nombre: { $regex: regex } });
    return kardexs;
  } catch (error) {
    console.log(error);
  }
};

export const loadBitacora = async () => {
  try {
    connectDB();
    const bitacora = await Bitacora.find();
    return bitacora;
  } catch (error) {
    console.log(error);
  }
};

export const loadCurso = async () => {
  try {
    connectDB();
    const cursos = await Curso.find();
    return cursos;
  } catch (error) {
    console.log(error);
  }
};