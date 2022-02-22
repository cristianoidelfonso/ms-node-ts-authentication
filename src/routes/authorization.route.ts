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
      const jwtOptions = { subject: user?.uuid, expiresIn: '10m'};

      const jwt = JWT.sign(jwtPayload, jwtSecretKey, jwtOptions);

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

authorizationRoute.post('/token/refresh',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      // 1 - Obter um token válido
      const tokenContent = request.body.token || request.params.token || request.headers['authorization'];
      
      const [tokenType, token] = tokenContent.split(' ');

       // 2 - Verificar se existe um token e se o mesmo é válido
      if (!token || !JWT.verify(token, 'my_secret_key')){
        throw new ForbiddenError('Token invalid.');
      }

      // 3 - Criar novo token para o usuário
      try {
        const tokenPayload = JWT.verify(token, 'my_secret_key');

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
          throw new ForbiddenError('Token invalid.');
        }

        const user = { uuid: tokenPayload.sub, username: tokenPayload.username };

        const jwtPayload = { username: user.username };
        const jwtSecretKey = 'my_secret_key';
        const jwtOptions = { subject: user?.uuid, expiresIn: '10m' };

        const jwt = JWT.sign(jwtPayload, jwtSecretKey, jwtOptions);

        response.status(StatusCodes.OK).json({ jwt: jwt });

        next();

      } catch (error) {
        throw new ForbiddenError('Token invalid.');
      }

      // 4 - Invalidar token antigo

      // response.send({'tokenType': tokenType, 'token': token});
     
      next();
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;