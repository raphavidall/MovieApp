const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } 
        });
        res.status(200).json({ users });
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ message: "Erro ao listar usuários" });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (role) {
            await user.update({ role });

            return res.json({ message: 'Permissões do usuário atualizadas com sucesso', user });
        } else {
            return res.status(400).json({ error: 'O campo "role" é obrigatório para atualização' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        await user.destroy();
        res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
        res.status(500).json({ message: "Erro ao excluir o usuário" });
    }
};