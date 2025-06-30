import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';

import dotenv from 'dotenv';
dotenv.config();
const host = process.env.DB_HOST;
const port = 5000;

import { Associations } from './models/Associations.js';
import {sequelize} from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import { categoryRoutes } from './routes/categoryRoutes.js';
import { productRoutes } from './routes/productRoutes.js';
import { authRoutes } from './routes/authRoutes.js';

const server = express();
server.use(logger);
server.use(cors());
server.use(express.json());
server.use('/v1', apiRoutes);

Associations();
sequelize.sync({force:false});

server.listen(port, ()=>{
    console.log(`Servidor rodando em:  http://${host}:${port}`);
})