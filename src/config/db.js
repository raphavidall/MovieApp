const dotenv = require('dotenv');
dotenv.config();

const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, 
        },
    },
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
