import { Post, Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllPost = async (
  page: number,
  limit: number,
  search?: string,
  isFeatured?: boolean,
  tags?: string[],
) => {
  // console.log(tags);
  const skip = (page - 1) * limit;
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      {
        isFeatured: isFeatured,
      },
      tags &&
        tags.length > 0 && {
          tags: { hasEvery: tags },
        },
    ].filter(Boolean),
  };
  const result = await prisma.post.findMany({
    where: where,
    skip,
    take: limit,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  const total = await prisma.post.count(where);
  return {
    data: result,
    pagination: {
      page,
      limit,
      total,
    },
  };
};

const getPostById = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return result;
};

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const createdPost = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return createdPost;
};

const updatePost = async (id: number, data: Partial<Post>) => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: data,
  });
  return result;
};

const deletePost = async (id: number) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PostService = {
  getAllPost,
  createPost,
  getPostById,
  updatePost,
  deletePost,
};
