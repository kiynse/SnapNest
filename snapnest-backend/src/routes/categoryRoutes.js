const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const { checkToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Criar uma nova categoria
router.post("/", checkToken, CategoryController.createCategory);

// Listar todas as categorias
router.get("/", CategoryController.getAllCategories);

// Mostrar uma categoria por ID
router.get("/:id", CategoryController.getCategoryById);

// Atualizar uma categoria por ID
router.put("/:id", checkToken, CategoryController.updateCategory);

// Deletar uma categoria por ID
router.delete("/:id", checkToken, CategoryController.deleteCategory);

module.exports = router;
