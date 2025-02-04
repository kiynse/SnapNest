const jwt = require('jsonwebtoken');
const config = require('../../config'); // Nosso arquivo de configuração

// Função para verificar o token JWT
let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // Remove a palavra ‘Bearer ’
    }

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token inválido.',
                });
            } else {
                req.user = decoded; // Atribui o usuário decodificado à requisição
                next();
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'Token não encontrado.',
        });
    }
};

module.exports = {
    checkToken,
};