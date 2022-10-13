import { Router } from 'express';
import debug from 'debug';

import { testAuth } from '../helper/extraHelper.js';
import userRoute from './route/userRoute.js';

const log = debug('app:apiRoutes -> ');

const apiRoutes = new Router();

apiRoutes.get('/v1/test', testAuth);
apiRoutes.use('/v1/user', userRoute);

export default apiRoutes;
