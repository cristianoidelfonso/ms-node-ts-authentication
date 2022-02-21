// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

import { Router, Request, Response, NextFunction } from 'express';

const usersRoute = Router();

usersRoute.get('/users', (request: Request, response: Response, next: NextFunction) => {
  const users = [{userName: 'Cristiano'}];
  response.status(200).send('users');
})

export default usersRoute;