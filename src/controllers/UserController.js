import UserModel from '../models/UserModel.js';

class UserController {

  async getUsers(req, res) {
    try {
      const response = await UserModel.getUsers();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        res.status(400).send();
        return;
      }

      const response = await UserModel.getUser(id);

      if(response.length == 0) {
        res.status(500).send();
        return;
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async setUser(req, res) {
    try {
      const { name, email, role } = req.body;

      if(!name || !email || !role) {
        res.status(400).send();
        return;
      }

      const response = await UserModel.setUser(name, email, role);

      if(JSON.parse(response.rowsAffected) != 1) {
        res.status(500).send();
        return;
      }

      res.status(201).json({"id": response.recordset[0].id, "name": name, "email": email, "role": role});
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;

      if(!id || !name || !email || !role) {
        res.status(400).send();
        return;
      }

      const response = await UserModel.updateUser(id, name, email, role);

      if(JSON.parse(response.rowsAffected) != 1) {
        res.status(500).send();
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        res.status(400).send();
        return;
      }

      const response = await UserModel.deleteUser(id);

      if(JSON.parse(response.rowsAffected) != 1) {
        res.status(500).send();
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  
}

export default new UserController();
