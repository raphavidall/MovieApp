const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Watchlist = db.define('watchlist', {
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    posterPath: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

User.hasMany(Watchlist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Watchlist.belongsTo(User, { foreignKey: 'userId' });

module.exports = Watchlist;
