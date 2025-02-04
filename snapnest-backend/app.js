const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./src/config/database');
const { syncDB } = require('./src/models'); // Nova função para sincronização

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const postRoutes = require("./src/routes/postRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const likeRoutes = require("./src/routes/likeRoutes");  
const commentRoutes = require("./src/routes/commentRoutes");  // Importa as rotas de comentários


app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);

app.use("/uploads", express.static("uploads")); // Permite acessar imagens via URL

// Teste de conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => console.log('✅ Conectado ao banco de dados com sucesso!'))
  .catch((err) => console.error('❌ Erro ao conectar ao banco de dados:', err));

// Sincronizando as tabelas (Evita usar `alter: true` diretamente no app)
syncDB();

// Definição de porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = app;
