import express from 'express';
import errorHandler from './middlewares/erro-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import jwtBearerAuthenticationMiddleware from './middlewares/jwt-bearer-authentication.middleware';

const app = express();

// Conf iguração da aplicação
// Especificando para aplicação utilizar o formato json com content-type aceito
app.use( express.json() );
app.use( express.urlencoded( { extended: true} ) );


// Configuração das rotas
app.use( statusRoute );
app.use( authorizationRoute );

app.use( jwtBearerAuthenticationMiddleware );
app.use( usersRoute );

// Configuração dos Handlers de erros
app.use(errorHandler);


// Inicialização do servidor
app.listen(3000, () => {
  console.log('Node Server Port 3000');
});