import express from 'express';
import UserController from '../controllers/UserController.js';

const userRoutes = express.Router();

userRoutes.get('/', UserController.getUsers);
userRoutes.get('/:id', UserController.getUser);
userRoutes.post('/', UserController.setUser);
userRoutes.put('/:id', UserController.updateUser);
userRoutes.delete('/:id', UserController.deleteUser);

export default userRoutes;
