const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const isUserExists = await User.findOne({ where: { email } });
        
        if (isUserExists) {
            return res.status(409).json({ error: 'O usuário já existe.' })
        }
        
        const user = await User.create({ 
            name, 
            email, 
            password: String(hashedPassword),
            role: role || 'user'
        });
        
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao registrar usuário', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout realizado com sucesso' });
};
