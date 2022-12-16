import {Owner} from "../models/ownerSchema";
import { createError } from '../utils/createError';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()
const register = async (request:any, response:any, next:any) => {
    const { email, name, password,profile } =
      request.body;
     console.log(request.body);
    const newPassword = bcrypt.hashSync(password, 10);
    let image;
  
    if (!name) {
      return next(createError(400, "No username"));
    }
  
    // if (request.files?.image) {
    //   const result = await uploadImage(request.files.image.tempFilePath, "users");
    //   await fs.remove(request.files.image.tempFilePath);
    //   image = {
    //     url: result.secure_url,
    //     public_id: result.public_id,
    //   };
    // }
  
    const owner = new Owner({
      profile: image,
      name,
      password: newPassword,
      email
    });
  
    try {
      const savedOwner = await owner.save();
      response.status(201).json(savedOwner);
    } catch (e) {
      next(e);
    }
  };
const login = async (request:any, response:any, next:any) => {
    const { name, password } = request.body;
    const owner = await Owner.findOne({ ownername: name });
    if(!owner) return;
    const correctPassword = await bcrypt.compare(password, owner.password);
    if (!(owner && correctPassword)) {
      return next(createError(400, "invalid username or password"));
    }
    try {
      const ownerForToken = {
        username: owner.name,
        id: owner._id,
      };
      if(!process.env.SECRET) return;
      const token = jwt.sign(ownerForToken, process.env.SECRET);
      response.status(200).json({
        token: token,
        name: owner.name,
        id: owner._id,
      });
    } catch (e) {
      next(e);
    }
  };
  export {register,login}