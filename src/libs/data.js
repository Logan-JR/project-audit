import { connectDB } from "@/libs/database";
import User from "@/models/cpa/User";
import Kardex from '@/models/academic/Kardex'

export const loadUsers = async () => {
  connectDB();
  const users = await User.find();
  return users;
};

export const loadKardexs = async () => {
  connectDB();
  const kardexs = await Kardex.find();
  return kardexs;
};
