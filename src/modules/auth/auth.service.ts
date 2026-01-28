import { prisma } from "../../lib/prisma";

const loginWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.password === password) {
    return user;
  }
};
export const AuthService = {
  loginWithEmailAndPassword,
};
