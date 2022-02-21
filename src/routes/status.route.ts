import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const statusRoute = Router();

statusRoute.get('/status', (request : Request, response: Response, next: NextFunction) => {
  response.status(StatusCodes.OK).send({ 'Hello':'world!', 'Funciona': 'Sim', 'Status': '200' });
});

export default statusRoute;