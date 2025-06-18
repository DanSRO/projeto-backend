import { Users } from "../models/Users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const generateToken = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({error:'Email ou senha são obrigatórios.'});
    }

    try{        
        const user = await Users.findOne({where:{email}});
        if(!user){
            return res.status(400).json({error:'Credenciais inválidas.'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({error:'Credenciais inválidas.'});
        }
        const token = jwt.sign(
            {id:user.id, email:user.email},        
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({token});    
    }catch(error){
        return res.status(500).json({error:'Erro ao gerar token.'});
    }
}