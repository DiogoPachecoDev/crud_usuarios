import connectToDb from '../utils/DbConnect.js';

class UserModel {

  async getUsers() {
    const pool = await connectToDb();
    try {
      const result = await pool.request()
      .query('SELECT * FROM collaborators');
      return result.recordset;
    } catch (error) {
      console.error('Error during database query:', error.message);
      throw { status: 500, message: 'Internal server error' };
    } finally {
      await pool.close();
    }
  }

  async getUser(id) {
    const pool = await connectToDb();
    try {
      const result = await pool.request()
      .input('id', id)
      .query('SELECT * FROM collaborators WHERE id = @id');
      return result.recordset;
    } catch (error) {
      console.error('Error during database query:', error.message);
      throw { status: 500, message: 'Internal server error' };
    } finally {
      await pool.close();
    }
  }

  async setUser(name, email, role) {
    const pool = await connectToDb();
    try {
      const result = await pool.request()
      .input('name', name)
      .input('email', email)
      .input('role', role)
      .query('INSERT INTO collaborators(name, email, role) OUTPUT INSERTED.id VALUES(@name, @email, @role)');
      return result;
    } catch (error) {
      console.error('Error during database query:', error.message);
      throw { status: 500, message: 'Internal server error' };
    } finally {
      await pool.close();
    }
  }

  async updateUser(id, name, email, role) {
    const pool = await connectToDb();
    try {
      const result = await pool.request()
      .input('id', id)
      .input('name', name)
      .input('email', email)
      .input('role', role)
      .query('UPDATE collaborators SET name = @name, email = @email, role = @role WHERE id = @id');
      return result;
    } catch (error) {
      console.error('Error during database query:', error.message);
      throw { status: 500, message: 'Internal server error' };
    } finally {
      await pool.close();
    }
  }

  async deleteUser(id) {
    const pool = await connectToDb();
    try {
      const result = await pool.request()
      .input('id', id)
      .query('DELETE FROM collaborators WHERE id = @id');
      return result;
    } catch (error) {
      console.error('Error during database query:', error.message);
      throw { status: 500, message: 'Internal server error' };
    } finally {
      await pool.close();
    }
  }
  
}

export default new UserModel();
