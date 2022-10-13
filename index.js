import app from './src/app.js';
import appConfig from './src/appConfig.js';
import debug from 'debug';
import { databaseConnected } from './src/models/index.js';

const indexDebug = debug('app:index ->');
const { port } = appConfig;
(async ()=>{
  indexDebug('Starting the server');
  app.listen(port, async () => {
    try {
      indexDebug(`Server is running on the http://localhost:${port}`);
    } catch (err) {
      indexDebug(err.message);
    }
  });
  await databaseConnected();
})();
