import debug from 'debug';

const log = debug('app:userModel ->');

const getUserModel = async (sequelize, { DataTypes, Model }) => {
  const User = sequelize.define('user', {
    userName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });
  return User;
};
export default getUserModel;
