import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
const host = process.env.DB_HOST;
const port = 5000;

import { Associations } from './models/Associations.js';
import {sequelize} from './config/database.js';
import apiRoutes  from './routes/index.js';
import path from 'path';

import { logger } from './middleware/logger.js';

const server = express();
server.use(logger);

server.use(cors());
server.use(express.json());
server.use('/v1', apiRoutes);

const __dirname = path.resolve();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname,'src', 'views'));
server.use(express.static(path.join(__dirname, 'src')));

server.get('/', async (req, res) => {
    try{
        const resposta = await fetch('http://localhost:5000/v1/user');
        const users = await resposta.json();
        // return res.status(200).send("Página inicial");        
        res.render('index', {title:'Página Principal', users});
    }catch(error){
        res.status(500).send('Erro ao carregar usuários.');        
    }
})

server.get('/produtos', async(req, res)=>{
    try{
        const response = await fetch('http://localhost:5000/v1/product');
        const json = await response.json();
        res.render('products', {produtos:json.data});
    }catch(error){
        res.status(500).send('Erro ao carregar produtos.');
    }
})

server.use((req, res)=>{
    res.status(404).render('404', {title:'Página não encontrada.'});
})
Associations();
sequelize.sync({force:false});

server.listen(port, ()=>{
    console.log(`Servidor rodando em:  http://${host}:${port}`);
})