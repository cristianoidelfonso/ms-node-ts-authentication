import { Pool } from 'pg';

// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb';
// const db = new Pool({ connectionString });

const db = new Pool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default db;