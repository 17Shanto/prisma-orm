import { Request, Response } from "express";
import { PostService } from "./post.service";

const getAllPost = async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    // console.log(tags);

    const result = await PostService.getAllPost(
      Number(page),
      Number(limit),
      search,
      isFeatured,
      tags,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getPostById(Number(req.params.id));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.updatePost(
      Number(req.params.id),
      req.body,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.deletePost(Number(req.params.id));
    res.status(204).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const PostController = {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getAllPost,
};
