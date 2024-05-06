import { connectDB } from "@/libs/database";
import User from "@/models/cpa/User";

export const loadUsers = async () => {
  connectDB();
  const users = await User.find();
  return users;
};
