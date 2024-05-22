import { Router } from "express";

const router = Router();

import { createArticle, getArticle, getArticleById, deleteArticleById } from "../controllers/articulo.controller";
import multer from "../libs/multer";

router.route('/articulos')
    .post(multer.single('image'),createArticle)
    .get(getArticle)

router.route('/articulos/:id')
    .get(getArticleById)
    .delete(deleteArticleById)



























export default router;