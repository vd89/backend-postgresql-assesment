import { Router } from 'express';
import { testAuth } from '../../helper/extraHelper.js';
import { auth } from '../../middleware/errorMiddleware.js';


const movieRoute = new Router();


movieRoute.get('/test', auth, testAuth);


export default movieRoute;
