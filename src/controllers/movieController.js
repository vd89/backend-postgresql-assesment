import debug from 'debug';
import lodashPkg from 'lodash';
import { Movie, Actor } from '../models/index.js';

const logger = debug('app:movieController -> ');
const { isDate } = lodashPkg;

export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.findAll({ include: [
      { model: Actor, as: 'actors', attributes: ['id', 'name'] },
    ] });
    return res.ok({ message: 'SUCCESS', data: movies });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};


export const addMovie = async (req, res, next) => {
  try {
    const { title, rating, genre, releaseDate, actor } = req.body;
    const isActor = await Actor.findOne({ where: { name: actor } });
    const isMovie = await Movie.findOne({ where: { title } });
    if (isActor === null && isMovie === null) {
      const newActor = await Actor.create({ name: actor });
      const movie = await Movie.create({ title, rating, genre, releaseDate }, {
        include: [{
          model: Actor,
          as: 'actors',
        }],
      });
      await movie.addActor(newActor);
      await newActor.addMovie(movie);
      const result = await Movie.findOne({ where: { title }, include: Actor });
      return res.ok({ message: 'MOVIE_CREATED', data: { result } });
    }
    const result = await Movie.findOne({ where: { title }, include: Actor });
    return res.ok({ message: 'MOVIE_FOUND', data: result });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const updateMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, genre, releaseDate, actor } = req.body;
    const isActor = await Actor.findOne({ where: { name: actor } });
    const isMovie = await Movie.findOne({ where: { id } });
    if (isActor === null) {
      const newActor = await Actor.create({ name: actor });
      await isMovie.addActor(newActor);
    }
    await Movie.update({ rating: rating, genre: genre, releaseDate: releaseDate }, { where: { id } });
    await isMovie.addActor(isActor);
    const result = await Movie.findOne({ where: { id }, include: Actor });
    return res.ok({ message: 'SUCCESS', data: result });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};

export const deleteMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const remove = await Movie.destroy({ where: { id }, force: true });
    return res.ok({ message: 'SUCCESS', data: remove });
  } catch (err) {
    logger(err.message);
    next(err);
  }
};
