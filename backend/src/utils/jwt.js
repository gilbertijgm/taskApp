import { TOKEN_SECRET } from "./config.js";
import jwt from 'jsonwebtoken'; 

export function createAccessToken(payload){
   return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (error, token) => {
                if (error) reject(error)
                resolve(token);
            }
        )
    });
}
// jwt.sign({
//     id: userSaved._id,
// }, 
// '123456', 
// {expiresIn: "1d"}, 
// (error, token) => {
//     if (error) console.log(error);
    
// })
