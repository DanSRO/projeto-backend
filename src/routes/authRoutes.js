import express from 'express';
import { generateToken } from '../controllers/authControllers';

export const router = express.Router();

router.post('/v1/user/token', generateToken);
