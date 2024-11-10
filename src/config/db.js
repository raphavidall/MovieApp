const dotenv = require('dotenv');
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL); // Log to check if the variable is loaded

const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

db.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((error) => {
        console.error('Não foi possível conectar ao banco de dados:', error);
    });

module.exports = db;
