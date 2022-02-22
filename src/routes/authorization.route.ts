import { Router, Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';
import bearerAuthenticationMiddleware from '../middlewares/jwt-bearer-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, 
  async (request: Request, response: Response, next: NextFunction) => {
  
    try {

      const user = request.user;
      // response.send(user);

      if(!user){
        throw new ForbiddenError('User not informed.');
      }

      const jwtPayload = { username: user.username }; 
      const jwtSecretKey = 'my_secret_key';
      const jwtSubject = { subject: user?.uuid };

      const jwt = JWT.sign(jwtPayload, jwtSecretKey, jwtSubject);

      response.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
      next(error);
    }
  }
);

authorizationRoute.post('/token/validate', bearerAuthenticationMiddleware, 
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      response.status(StatusCodes.OK).send({'msg': 'Token JWT valid.'})
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;