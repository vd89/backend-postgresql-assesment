import { Sequelize } from 'sequelize';
import debug from 'debug';
import appConfig from '../appConfig.js';
import getUserModel from './userModel.js';


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
db.users = await getUserModel(sequelize, Sequelize);

export const databaseConnected = async () => {
  try {
    await sequelize.authenticate();
    // sequelize.sync();
    log('Database Connected to the app ');
  } catch (err) {
    await sequelize.close();
    log('DataBase error', err.message);
  }
};
export default db;
