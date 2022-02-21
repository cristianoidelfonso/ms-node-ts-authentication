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

  try {
  
    const users = await userRepository.findAllUsers();
  
    response.status(StatusCodes.OK).send(users);
  
  } catch (error) {
    next(error);  
  }
  
});


usersRoute.get('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  
  try {
    
    const uuid = request.params.uuid;

    const user = await userRepository.findById(uuid);
    
    response.status(StatusCodes.OK).send({ user });
  
  } catch (error) {
   next(error);
  }

});


usersRoute.post('/users', async (request: Request, response: Response, next: NextFunction) => {
  
  try {
    
    const newUser = request.body;

    const uuid = await userRepository.store(newUser);
  
    response.status(StatusCodes.CREATED).send({ msg: 'Recurso criado com sucesso.' , 'uuid': uuid});

  } catch (error) {
    next(error);
  }

});


usersRoute.put('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
  
  try {
  
    const uuid = request.params.uuid

    const modifyUser = request.body;

    modifyUser.uuid = uuid;

    await userRepository.update(modifyUser);
  
    response.status(StatusCodes.OK).send({ msg: 'Recurso atualizado com sucesso.' });

  } catch (error) {
    next(error);
  }


});


usersRoute.delete('/users/:uuid', async (request: Request<{ uuid: string }>, response: Response, next: NextFunction) => {
   try {
     
    const uuid = request.params.uuid;

    await userRepository.destroy(uuid);
  
    response.status(StatusCodes.OK).send({ msg: 'Recurso deletado com sucesso.' });

  } catch (error) {
    next(error);
  }

});

export default usersRoute;