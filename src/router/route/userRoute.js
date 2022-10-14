import { Router } from 'express';
import { loginUser, registerUser } from '../../controllers/userController.js';
import { testAuth } from '../../helper/extraHelper.js';
import { loginRules, registerRules, validate } from '../../helper/inputValidators.js';
import { auth } from '../../middleware/errorMiddleware.js';

const userRoute = new Router();

userRoute.get('/', testAuth);
userRoute.get('/auth', auth, testAuth);
userRoute.post('/registerUser', registerRules(), validate, registerUser);
userRoute.post('/loginUser', loginRules(), validate, loginUser);


export default userRoute;
