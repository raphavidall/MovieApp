const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User'); // Importa o modelo User

const Watchlist = db.define('Watchlist', {
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    posterPath: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

// Relação entre User e Watchlist (um usuário pode ter vários filmes na lista para assistir)
User.hasMany(Watchlist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Watchlist.belongsTo(User, { foreignKey: 'userId' });

module.exports = Watchlist;
