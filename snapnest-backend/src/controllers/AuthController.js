const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const config = require("../../config");

const AuthController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Verifica se o usuário existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "E-mail ou senha inválidos" });
      }

      // Verifica a senha
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "E-mail ou senha inválidos" });
      }

      // Gerar token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: "24h",
      });

      return res.json({ token, user });
    } catch (error) {
      console.error("❌ Erro no login:", error);
      return res.status(500).json({ message: "Erro ao fazer login" });
    }
  },
};

module.exports = AuthController;
