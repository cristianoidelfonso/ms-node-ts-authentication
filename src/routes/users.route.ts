// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes} from 'http-status-codes';

const usersRoute = Router();

usersRoute.get('/users', (request: Request, response: Response, next: NextFunction) => {
  const users = [{userName: 'Cristiano'}];
  response.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  const uuid = request.params.uuid;
  response.status(StatusCodes.OK).send({ uuid });
});

usersRoute.post('/users', (request: Request, response: Response, next: NextFunction) => {
  const newUser = request.body;
  response.status(StatusCodes.CREATED).send(newUser);
});

usersRoute.put('/users/:uuid', (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  const uuid = request.params.uuid
  response.status(StatusCodes.OK).send({ uuid });
});

usersRoute.delete('/users/:uuid', (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  const uuid = request.params.uuid;
  response.status(StatusCodes.OK).send({ msg: 'Recurso deletado com sucesso.' });
});

export default usersRoute;