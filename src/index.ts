import express , { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users.route';

const app = express();

// Conf iguração da aplicação
// Especificando para aplicação utilizar o formato json com content-type aceito
app.use( express.json() );
app.use( express.urlencoded( { extended: true} ) );


// Configuração das rotas
app.use(usersRoute);

// Rota de teste de funcionamento
app.get('/status', ( request: Request, response: Response, next: NextFunction ) => {
  response.status(200).send({ 'Hello':'world!', 'Funciona': 'Sim', 'Status': '200' });
});


// Inicialização do servidor
app.listen(3000, () => {
  console.log('Node Server Port 3000');
});