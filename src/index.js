const express = require('express');
const app = express();
const db = require('./config/db');  
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController'); 
const adminController = require('./controllers/adminController'); // Rota consulta e exclusão de usuário - Cristiano
const movieController = require('./controllers/movieController');
const { authMiddleware, isAdmin } = require('./middlewares/authMiddleware');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 
dotenv.config();

const PORT = process.env.PORT || 8080;

// Rotas publicas
app.post('/register', authController.register);
app.post('/login', authController.login);

// Rotas user
app.post('/logout', authMiddleware, authController.logout);
app.get('/movies', authMiddleware, movieController.getMovies); 
app.post('/favorites', authMiddleware, movieController.addFavorite);
app.delete('/favorites', authMiddleware, movieController.removeFavorite);
app.post('/watchlist', authMiddleware, movieController.addWatchlist);
app.delete('/watchlist', authMiddleware, movieController.removeWatchlist);
app.get('/watchlist/populares', authMiddleware, movieController.getMoviesPopulares);

// Rotas admin
app.get('/users', authMiddleware, isAdmin, adminController.getAllUsers)
app.put('/users/:id', authMiddleware, isAdmin, adminController.updateUser);
app.delete('/users/:id', authMiddleware, isAdmin, adminController.deleteUser);


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
