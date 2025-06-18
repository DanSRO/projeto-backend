import express from 'express';
import { generateToken } from '../controllers/authControllers.js';

export const authRoutes = express.Router();

authRoutes.post('/token', generateToken);
