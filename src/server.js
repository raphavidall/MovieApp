
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authController = require('./controllers/authControllerauthController');
const movieController = require('./controllers/movieController')
const authMiddleware = require('./middlewares/authMiddleware')
const { sequelize } = require('./models');

dotenv.config();
const PORT = process.env.PORT || 3000; // Define a porta

sequelize.sync({ alter: true })
    .then(() => {
        console.log("Todos os modelos foram sincronizados com o banco de dados!");
    })
    .catch(err => {
        console.error("Erro ao sincronizar os modelos:", err);
    });

const app = express();


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(bodyParser.json());

app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);
app.get('/movies', movieController.getMovies);
app.post('/favorites', authMiddleware, movieController.addFavorite);
app.delete('/favorites', authMiddleware, movieController.removeFavorite);
app.post('/watchlist', authMiddleware, movieController.addWatchlist);
app.delete('/watchlist', authMiddleware, movieController.removeWatchlist);

    