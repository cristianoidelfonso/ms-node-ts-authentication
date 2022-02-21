import express , { Request, Response, NextFunction } from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Conf iguração da aplicação
// Especificando para aplicação utilizar o formato json com content-type aceito
app.use( express.json() );
app.use( express.urlencoded( { extended: true} ) );


// Configuração das rotas
app.use(statusRoute);
app.use(usersRoute);


// Inicialização do servidor
app.listen(3000, () => {
  console.log('Node Server Port 3000');
});