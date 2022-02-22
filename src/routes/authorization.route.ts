import { Router, Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';
import JWT from 'jsonwebtoken';

const authorizationRoute = Router();

authorizationRoute.post('/token', async (request: Request, response: Response, next: NextFunction) => {
  
  try {

    const authorizationHeaders = request.headers['authorization'];

    if(!authorizationHeaders){
      throw new ForbiddenError('Credentials not informed.');
    }

    const [authenticationType, token] = authorizationHeaders.split(' ');

    if(authenticationType !== 'Basic' || !token){
      throw new ForbiddenError('Type authentication invalid.');
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

    const [username, password] = tokenContent.split(':');

    if(!username || !password){
      throw new ForbiddenError('Unfilled credentials.')
    }

    const user = await userRepository.findByUsernameAndPassword(username, password);

    console.log(user);

  } catch (error) {
    next(error);
  }
  
});

export default authorizationRoute;