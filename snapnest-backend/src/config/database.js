const Sequelize = require('sequelize');

// Configuração da conexão com o banco
const sequelize = new Sequelize(
    'SnapNest',         // Nome do banco
    'postgres',    // Usuário do banco
    'postgres',    // Senha do banco
    {
        host: 'localhost',  // Host
        port: 5432,         // Porta padrão do PostgreSQL
        dialect: 'postgres' // Dialeto
    }
);

// Testar a conexão
sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = sequelize;