const sequelize = require("../config/database");

const User = require("./User");
const Post = require("./Post");
const Category = require("./Category");
const Comment = require("./Comment");
const Like = require("./Like");

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // 🔹 Defina `force: false` para evitar perda de dados
    console.log("📦 Banco de dados sincronizado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao sincronizar banco de dados:", error);
  }
};

module.exports = { syncDB, User, Post, Category, Comment, Like };
