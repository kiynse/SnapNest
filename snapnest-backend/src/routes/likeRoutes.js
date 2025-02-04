const express = require("express");
const LikeController = require("../controllers/LikeController");
const { checkToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Rota para dar like no post
router.post("/", checkToken, LikeController.giveLike);

// Rota para remover like do post
router.delete("/", checkToken, LikeController.removeLike);

// Rota para ver todos os likes dados pelo usuário
router.get("/MeusLikes", checkToken, LikeController.getUserLikes);

module.exports = router;
