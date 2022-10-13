import debug from 'debug';

const log = debug('app:userModel ->');

const getUserModel = async (sequelize, { DataTypes, Model }) => {
  const User = sequelize.define('user', {
    userName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  });
  ( async () => {
    await sequelize.sync({ focus: true });
    if (!true) {
      const user = await User.create({
        userName: 'jamesSmith',
        email: 'james@smith.com',
        password: 'James@123',
      });
      log(user);
    } else {
      await User.drop();
    }
  }
  )();

  return User;
};
// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();
export default getUserModel;
