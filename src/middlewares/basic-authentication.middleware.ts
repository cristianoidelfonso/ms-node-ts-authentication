import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware(request: Request, response: Response, next: NextFunction) {

  try {

    const authorizationHeader = request.headers['authorization'];

    if(!authorizationHeader){
      throw new ForbiddenError('Credentials not informed.');
    }

    const [authenticationType, token] = authorizationHeader.split(' ');

    if(authenticationType !== 'Basic' || !token){
      throw new ForbiddenError('Type authentication invalid.');
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

    const [username, password] = tokenContent.split(':');

    if(!username || !password){
      throw new ForbiddenError('Unfilled credentials.')
    }

    const user = await userRepository.findByUsernameAndPassword(username, password);

    if(!user){
      throw new ForbiddenError('Invalid username and/or password.')
    }

    request.user = user;

    next();
    
  } catch (error) {
    next(error);
  }
 
}

export default basicAuthenticationMiddleware;