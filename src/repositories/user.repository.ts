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

  async store(user: User) : Promise<string>{

    const script = `INSERT INTO application_users(userName, password) 
                    VALUES ( $1, crypt($2, 'my_salt') )
                    RETURNING uuid`;
    
    const values = [user.userName, user.password];

    const { rows } = await db.query<{  uuid: string }>(script, values);

    const [ newUser ] = rows;

    return newUser.uuid;
    
  }


  async update(user: User): Promise<void> {

    const script = `UPDATE application_users 
                    SET 
                      userName = $1,
                      password = crypt($2, 'my_salt') 
                    WHERE uuid = $3`;

    const values = [user.userName, user.password, user.uuid];

    await db.query(script, values);

  }

  async destroy(uuid: string): Promise<void> {

    const script = `DELETE FROM application_users WHERE uuid = $1`;

    const values = [uuid];

    await db.query(script, values);
  }

}

export default new UserRepository();