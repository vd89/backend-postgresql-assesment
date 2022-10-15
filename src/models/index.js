import { Sequelize } from 'sequelize';
import debug from 'debug';
import appConfig from '../appConfig.js';
import getUserModel from './userModel.js';
import getMovieModel from './movieModel.js';
import getMoviePersonModel from './moviesPersonModel.js';


const { dbConfig } = appConfig;

const log = debug('app:dbConnection ->');

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// model connection
export const User = db.users = await getUserModel(sequelize, Sequelize);
export const Movie = db.movies = await getMovieModel(sequelize, Sequelize);
export const Actor = db.actors = await getMoviePersonModel(sequelize, Sequelize);

export const databaseConnected = async () => {
  try {
    // many to many relation
    await Movie.belongsToMany(Actor, { through: 'movie_cast' });
    await Actor.belongsToMany(Movie, { through: 'movie_cast' });

    await sequelize.sync({ force: false });
    await sequelize.authenticate();
    log('Database Connected to the app ');
  } catch (err) {
    await sequelize.close();
    log('DataBase error', err.message);
  }
};

export default db;
