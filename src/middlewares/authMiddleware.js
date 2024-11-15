const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) return res.status(401).json({ error: 'Acesso negado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    // Verifica se o usuário tem a role de 'admin'
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado! Usuário não autorizado.' });
    }
    next();
};

module.exports = { authMiddleware, isAdmin };
