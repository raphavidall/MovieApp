const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User'); // Importa o modelo User

const Favorite = db.define('favorite', {
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
        allowNull: true, // Pode ser nulo caso o filme não tenha poster
    },
}, {
    timestamps: true,
});

// Relação entre User e Favorite (um usuário pode ter vários favoritos)
User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

module.exports = Favorite;
