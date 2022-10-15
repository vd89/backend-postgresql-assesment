import debug from 'debug';

const log = debug('app:movieModel -> ');

const getMoviePersonModel = async (sequelize, { DataTypes, Model }) => {
  const Actors = sequelize.define('actors', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
    timeStamps: false,
    createdAt: false,
    updatedAt: false,
  });
  return Actors;
};

export default getMoviePersonModel;
