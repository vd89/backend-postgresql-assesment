import app from './src/app.js';
import appConfig from './src/appConfig.js';
import debug from 'debug';
import db from './src/helper/dbConnectionHelper.js';

const indexDebug = debug('app:index ->');
const { port } = appConfig;

(async ()=>{
  indexDebug('Starting the server');
  app.listen(port, () => {
    try {
      indexDebug(`Server is running on the http://localhost:${port}`);
    } catch (err) {
      indexDebug(err.message);
    }
  });
  await db.sequelize.sync({ force: true }).then(() => {
    indexDebug(`Data Base is connected`);
  }).catch((err)=> indexDebug(err.message));
})();
