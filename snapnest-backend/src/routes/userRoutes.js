const express = require("express");
const UserController = require("../controllers/UserController");
const upload = require("../middlewares/uploadMiddleware");
const { checkToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Mostrar todos os usuários
router.get("/", checkToken, UserController.getAllUsers);

// Mostrar um usuário pelo ID
router.get("/:id", checkToken, UserController.getUserById);

// Rota para criar um novo usuário
router.post("/", checkToken, UserController.createUser);

// Atualizar dados do usuário
router.put("/update", checkToken, UserController.updateUser);

// Atualizar foto de perfil
router.put("/update-profile-picture", checkToken, upload.single("image"), UserController.updateProfilePicture);

// Deletar conta do usuário
router.delete("/delete", checkToken, UserController.deleteUser);

module.exports = router;
