import express , { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users.route';

const app = express();

app.use(usersRoute);

// Rota de teste de funcionamento
app.get('/status', ( request: Request, response: Response, next: NextFunction ) => {
  response.status(200).send({ 'Hello':'world!', 'Funciona': 'Sim', 'Status': '200' });
});

app.listen(3000, () => {
  console.log('Node Server Port 3000');
});