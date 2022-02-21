import { Pool } from 'pg';

// const db = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   database: 'ms-node-auth',
//   password: 'root',
//   port: 5432,
// });


// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb';
const connectionString = 'postgresql://postgres:root@localhost:5432/ms-node-auth';

const db = new Pool({ connectionString });

export default db;