import db from '../db';
import User from '../models/user.model';
class UserRepository {

  async findAllUsers() : Promise<User[]> {

    const query = `SELECT uuid, userName FROM application_users`;
    
    // const result = await db.query<User>(query);
    // const rows = result.rows;
    
    // Usando desestruturação
    const { rows } = await db.query<User>(query);
    
    return rows ?? [];

  }

  async findById(uuid: string) : Promise<User> {
    const query = `SELECT uuid, userName FROM application_users WHERE uuid = $1`;

    const values = [uuid];

    const { rows } = await db.query<User>(query, values);

    const [ user ] = rows;

    return user;

  }

  

}

export default new UserRepository();