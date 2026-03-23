import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";

export const getAuthSession = async () => {
  return await getServerSession(authOptions);
};

