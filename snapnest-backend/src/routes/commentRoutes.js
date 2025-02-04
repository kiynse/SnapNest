const express = require("express");
const CommentController = require("../controllers/CommentController");
const { checkToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Rota para criar um comentário
router.post("/", checkToken, CommentController.createComment);

// Rota para editar um comentário
router.put("/", checkToken, CommentController.editComment);

// Rota para deletar um comentário
router.delete("/", checkToken, CommentController.deleteComment);

module.exports = router;
