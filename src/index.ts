import express from 'express';
import bearerAuthenticationMiddleware from './middlewares/bearer-authentication.middleware';
import errorHandler from './middlewares/erro-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Conf iguração da aplicação
// Especificando para aplicação utilizar o formato json com content-type aceito
app.use( express.json() );
app.use( express.urlencoded( { extended: true} ) );


// Configuração das rotas
app.use(statusRoute);
app.use( bearerAuthenticationMiddleware, usersRoute);
app.use(authorizationRoute);

// Configuração dos Handlers de erros
app.use(errorHandler);


// Inicialização do servidor
app.listen(3000, () => {
  console.log('Node Server Port 3000');
});