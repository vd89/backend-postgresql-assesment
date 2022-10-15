import debug from 'debug';
import { Sequelize } from 'sequelize';

const log = debug('app:movieModel -> ');

const getMovieModel = async (sequelize, { DataTypes, Model }) => {
  const Movie = sequelize.define('movie', {
    title: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATEONLY, allowNull: true },
  }, {
    timeStamp: true,
    createdAt: false,
    updatedAt: false,
  },
  );
  return Movie;
};

export default getMovieModel;
