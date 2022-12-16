import jwt from "jsonwebtoken"
import { createError } from '../utils/createError'; 
require('dotenv').config();

const getTokenFrom =( request:any )=> {
    const authorization = request.get('authorization');
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const verifyToken = (request:any, response:any, next:any) => {
    const token = getTokenFrom(request);
    if(!process.env.SECRET) return;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // if(!token || !decodedToken.id) {
    //     return next(createError(401, 'token missing or invalid'));
    // }
    // request.id = decodedToken.id
    next();
}

module.exports = { verifyToken };