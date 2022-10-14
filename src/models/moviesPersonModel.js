import debug from 'debug';

const log = debug('app:movieModel -> ');

const getMoviePersonModel = async (sequelize, { DataTypes, Model }) => {
  const Actors = sequelize.define('actors', {
    name: { type: DataTypes.STRING },
  }, {
    timeStamps: false,
    createdAt: false,
    updatedAt: true,
  });
  return Actors;
};

export default getMoviePersonModel;
