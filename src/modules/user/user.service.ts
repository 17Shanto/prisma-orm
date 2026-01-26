import { Prisma, User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  return createdUser;
};

const getAllFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      status: true,
      posts: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return result;
};

const getUserById = async (userId: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      picture: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      status: true,
      posts: true,
    },
  });
  return result;
};

const deleteUser = async (id: number) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (id: number, payload: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const UserService = {
  createUser,
  getAllFromDB,
  getUserById,
  deleteUser,
  updateUser,
};
