const {verify} = require('jsonwebtoken')

const key = 'very-secure-key'

const authenticate = (req,res,next)=>{
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({ message:'Authentication Required' });
    }

    verify(token,key, (err,user)=>{
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();

    });
}

const authenticateAdmin = (req,res,next)=>{

    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({ message:'Authentication Required' });
    }

    verify(token,key, (err,user)=>{
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        if(!user.isAdmin){
            return res.status(401).json({ message:'Authentication Required' });
        }

        req.user = user;
        next();

    });
}

module.exports = {authenticate,authenticateAdmin}