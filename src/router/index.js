import { Router } from 'express';

import { testAuth } from '../helper/extraHelper.js';
import userRoute from './route/userRoute.js';
import movieRoute from './route/movieRoute.js';

const apiRoutes = new Router();

apiRoutes.get('/v1/test', testAuth);
apiRoutes.use('/v1/user', userRoute);
apiRoutes.use('/v1/movies', movieRoute);


export default apiRoutes;
