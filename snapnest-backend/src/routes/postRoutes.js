const express = require("express");
const PostController = require("../controllers/PostController");
const upload = require("../middlewares/uploadMiddleware");
const { checkToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Rota para criar um post (upload de imagem) - **POST** /posts/upload
router.post("/upload", checkToken, upload.single("image"), PostController.createPost);

// Rota para listar todos os posts - **GET** /posts
router.get("/", PostController.getAllPosts);

// Rota para exibir um post específico pelo ID - **GET** /posts/:id
router.get("/:id", PostController.getPostById);

module.exports = router;
