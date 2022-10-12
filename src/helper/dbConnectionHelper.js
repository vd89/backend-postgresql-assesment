import debug from 'debug';
import { Sequelize } from 'sequelize';
import appConfig from '../appConfig.js';

const { dbConfig } = appConfig;

const log = debug('app:dbConnection ->');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
log(`Database is connected `);

export default db;
