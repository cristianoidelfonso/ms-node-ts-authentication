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

}

export default new UserRepository();