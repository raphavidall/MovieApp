const axios = require('axios');
const Favorite = require('../models/Favorite');
const Watchlist = require('../models/Watchlist');

exports.getMovies = async (req, res) => {
    const query = req.query.query || '';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
};


exports.addFavorite = async (req, res) => {
    const { movieId } = req.body;
    await Favorite.create({ userId: req.user.userId, movieId });
    res.json({ message: 'Filme favoritado!' });
};

exports.removeFavorite = async (req, res) => {
    const { movieId } = req.body;
    await Favorite.destroy({ where: { userId: req.user.userId, movieId } });
    res.json({ message: 'Filme removido dos favoritos!' });
};

exports.addWatchlist = async (req, res) => {
    const { movieId } = req.body;
    await Watchlist.create({ userId: req.user.userId, movieId });
    res.json({ message: 'Filme adicionado à watchlist!' });
};

exports.removeWatchlist = async (req, res) => {
    const { movieId } = req.body;
    await Watchlist.destroy({ where: { userId: req.user.userId, movieId } });
    res.json({ message: 'Filme removido da watchlist!' });
};
