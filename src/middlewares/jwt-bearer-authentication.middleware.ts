import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from "jsonwebtoken";

async function jwtBearerAuthenticationMiddleware(request: Request, response: Response, next: NextFunction) {

  try {

    const authorizationHeader = request.headers['authorization'];
    // response.send({'auth header': authorizationHeader});

    if(!authorizationHeader){
      throw new ForbiddenError('Credentials not informed.');
    }

    const [authenticationType, token] = authorizationHeader.split(' ');
    // response.send({'type': authenticationType, 'token':token});

    if(authenticationType !== 'Bearer' || !token){
      throw new ForbiddenError('Type authentication invalid.');
    }
  
    try {
      const tokenPayload = JWT.verify(token, 'my_secret_key');
      // response.send({'token payload':tokenPayload});

      if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        throw new ForbiddenError('Token invalid.');
      }

      const user = { uuid: tokenPayload.sub, username: tokenPayload.username };
      // response.send({'user': user});

      request.user = user;
      // response.send({'user': request.user});

      next();
      
    } catch (error) {
      throw new ForbiddenError('Token invalid.');
    }
   

  } catch (error) {
    next(error);
  }
}

export default jwtBearerAuthenticationMiddleware;