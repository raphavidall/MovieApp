const express = require('express');
const app = express();
const db = require('./config/db');  
const dotenv = require('dotenv');
const authController = require('./controllers/authController'); 
const movieController = require('./controllers/movieController');
const authMiddleware = require('./middlewares/authMiddleware');
app.use(express.json()); 
dotenv.config();

const PORT = process.env.PORT || 3000;

// Definindo rotas
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);
app.get('/movies', movieController.getMovies);
app.post('/favorites', authMiddleware, movieController.addFavorite);
app.delete('/favorites', authMiddleware, movieController.removeFavorite);
app.post('/watchlist', authMiddleware, movieController.addWatchlist);
app.delete('/watchlist', authMiddleware, movieController.removeWatchlist);

//Sincronizando o banco de dados
db.sync({ alter: true })
    .then(() => {
        console.log("Todos os modelos foram sincronizados com o banco de dados!");
    })
    .catch(err => {
        console.error("Erro ao sincronizar os modelos:", err);
    });

// // Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
