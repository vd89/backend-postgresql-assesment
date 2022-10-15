import { Router } from 'express';
import { addMovie, deleteMovieById, getAllMovies, updateMovieById } from '../../controllers/movieController.js';
import { testAuth } from '../../helper/extraHelper.js';
import { auth } from '../../middleware/errorMiddleware.js';


const movieRoute = new Router();


movieRoute.get('/', auth, getAllMovies);
movieRoute.get('/test', auth, testAuth);
movieRoute.post('/add', auth, addMovie );
movieRoute.put('/:id', auth, updateMovieById);
movieRoute.delete('/:id', auth, deleteMovieById);


export default movieRoute;
