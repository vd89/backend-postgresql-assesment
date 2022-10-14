import debug from 'debug';

const log = debug('app:movieModel -> ');

const getMovieModel = async (sequelize, { DataTypes, Model }) => {
  const Movie = sequelize.define('movie', {
    movieId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATE, allowNull: false },
  }, {
    timeStamp: true,
    createdAt: false,
    updatedAt: false,
  },
  );
  return Movie;
};

export default getMovieModel;
