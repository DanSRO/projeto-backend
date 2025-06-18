import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(400).json({error:'Token não envado ou mal formatado.'});
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //pode usar nos endpoints que quiser.
        next();
    }catch(error){
        return res.status(400).json({error:'Token inválido ou expirado.'})
    }
};