import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', verifyToken, createUser)
userRoutes.put('/:id', verifyToken, updateUser);
userRoutes.delete('/:id', verifyToken, deleteUser);

export default userRoutes;