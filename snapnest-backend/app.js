const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');
const cors = require('cors');

dotenv.config();

const app = express();

// Usando o CORS e o middleware JSON
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

// Sincronizando as tabelas
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar banco de dados:', err);
  });

  // Definindo a porta
const PORT = process.env.PORT || 3000;

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;