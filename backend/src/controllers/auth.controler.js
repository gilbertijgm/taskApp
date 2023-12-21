import { UserModel } from "../daos/mongodb/models/user.model.js";
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs';
import { TOKEN_SECRET } from "../utils/config.js";
import { createAccessToken } from "../utils/jwt.js";

export const register = async (req,res,next)=> {
    try {
        const { email, password, username } = req.body;

        const userFound = await UserModel.findOne({email});
        if(userFound) return res.status(400).json(["Email ya registrado"])
        
        //hashing password
        const passwordHash = await bcrypt.hash(password, 10)

        //creando usuario
        const newUser = new UserModel({
            username,
            email,
            password: passwordHash
        })
        //guardando en la base de datos
        const userSaved = await newUser.save();

        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token); 
       // res.json({ msg: "user created successfully" });
        
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });
    
    } catch (error) {
        next(error.message);
    }
    
};

export const login = async (req,res,next)=> {
    const { email, password } = req.body;

    try {
        //verificamos si el usuario existe y comparamos password
        const userFound =  await UserModel.findOne({ email });
        if(!userFound) return res.status(400).json(["user not found"]);

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json(["password incorrect"]);

        //creamos el token 
        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    
    } catch (error) {
        next(error.message);
    }
    
};

export const logout = (req, res) => {
    res.cookie('token', "", { expires: new Date(0)})

    return res.sendStatus(200);
};

export const profile = async(req, res, next) => {
    try {
       const userFound = await UserModel.findById(req.user.id);
    
       if (!userFound) return res.sendStatus(400).json({msg: 'User not found'});
    
       return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
       });
    
   } catch (error) {
        next(error.message);
   }
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;
 
    if (!token) return res.status(401).json({msg: "Unauthorized"});

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(401).json({msg: "Unauthorized"});

        const userFound = await UserModel.findById(user.id);
        if(!userFound) return res.status(401).json({msg: "Unauthorized"});
   
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
    
}
