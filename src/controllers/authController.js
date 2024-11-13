const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const isUserExists = await User.findOne({ where: { email } });

        if (isUserExists) {
            return res.status(409).json({ error: 'O usuário já existe.' })
        }
        
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao registrar usuário' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout realizado com sucesso' });
};

exports.getAllUsers = async (req, res) => {
    try {
        // Busca todos os usuários cadastrados - Cristiano
        const users = await User.findAll({
            attributes: { exclude: ['password'] } 
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ message: "Erro ao listar usuários" });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Verifica se o usuário existe - Cristiano
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Exclui o usuário - Cristiano
        await user.destroy();
        res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
        res.status(500).json({ message: "Erro ao excluir o usuário" });
    }
};
