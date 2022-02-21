// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes} from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.model';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

usersRoute.get('/users', async (request: Request, response: Response, next: NextFunction) => {
  
  const users = await userRepository.findAllUsers();
  
  response.status(StatusCodes.OK).send(users);

});


usersRoute.get('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  
  try {
    
    const uuid = request.params.uuid;

    const user = await userRepository.findById(uuid);
    
    response.status(StatusCodes.OK).send({ user });
  
  } catch (error) {

   

  }

});


usersRoute.post('/users', async (request: Request, response: Response, next: NextFunction) => {
  
  const newUser = request.body;

  const uuid = await userRepository.store(newUser);
  
  response.status(StatusCodes.CREATED).send({ msg: 'Recurso criado com sucesso.' , 'uuid': uuid});

});


usersRoute.put('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  
  const uuid = request.params.uuid

  const modifyUser = request.body;

  modifyUser.uuid = uuid;

  await userRepository.update(modifyUser);
  
  response.status(StatusCodes.OK).send({ msg: 'Recurso atualizado com sucesso.' });

});


usersRoute.delete('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  
  const uuid = request.params.uuid;

  await userRepository.destroy(uuid);
  
  response.status(StatusCodes.OK).send({ msg: 'Recurso deletado com sucesso.' });

});

export default usersRoute;