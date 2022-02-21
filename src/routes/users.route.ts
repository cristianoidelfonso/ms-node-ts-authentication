// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes} from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

usersRoute.get('/users', async (request: Request, response: Response, next: NextFunction) => {
  
  const users = await userRepository.findAllUsers();
  
  response.status(StatusCodes.OK).send(users);
});


usersRoute.get('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  
  const uuid = request.params.uuid;

  const user = await userRepository.findById(uuid);
  
  response.status(StatusCodes.OK).send({ user });
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