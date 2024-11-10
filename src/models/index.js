const db = require('../config/db');
const User = require('./User');
const Favorite = require('./Favorite');
const Watchlist = require('./Watchlist');

// Associações
User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Watchlist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Watchlist.belongsTo(User, { foreignKey: 'userId' });

module.exports = { db, User, Favorite, Watchlist };
