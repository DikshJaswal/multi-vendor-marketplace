import User from "@/models/User";
import bcrypt from "bcryptjs";

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create(data);

  return user;
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};