import { Users } from "../models/Users.js";

export const getAllUsers = async (req, res) => {
    try{        
        const users = await Users.findAll();
        if(!users){
            return res.status(404).json({error:'Usuários não encontrados.'});
        }
        res.status(200).json(users);
    }catch(error){
        return res.status(500).json({error:'Erro ao buscar usuários.'});
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    
    try{
        const user = await Users.findByPk(id, {attributes:{exclude:['password']}});
        if(!user){
            return res.status(404).json({error:'Usuário não encontrado.'});
        }
        res.status(200).json(user);
    }catch(error){
        return res.status(500).json({error:'Erro ao buscar usuário.'});
    }
}

export const createUser = async (req, res) => {
    const { firstname, surname, email, password } = req.body;
    if(!firstname || !surname || !email || !password){
        return res.status(400).json({error:'Todos os campos são obrigatórios.'});
    }
    try{
        const newUser = await Users.create({firstname, surname, email, password});
        res.status(201).json({
            id:newUser.id,
            firstname:newUser.firstname,
            surname:newUser.surname,
            email:newUser.email,
            created_at:newUser.createdAt
        })
    }catch(error){
        console.error('Erro ao criar usuário: ', error);
        res.status(500).json({error:'Erro ao criar usuário.'});
    } 
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const dados  = req.body;

    try{
        const user = await Users.findByPk(id);
        if(!user){
            return res.status(404).json({error:'Usuário não encontrado.'});
        }

        await user.update(dados);
        res.json({message:'Usuário atualizado com sucesso.', user});
    }catch(error){
        return res.status(500).json({error:'Erro ao atualizar usuário.'});
    }
}

export const deleteUser = async (req, res) =>{
    const { id } = req.params;

    try{        
        const user =  await Users.findByPk(id);
        if(!user){
            return res.status(404).json({error:'Usuário não encontrado.'});
        }
        await user.destroy();
        res.status(204).send();
    }catch(error){
        return res.status(500).json({error:'Erro ao excluir usuário.'})
    }
}