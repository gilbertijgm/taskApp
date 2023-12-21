import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../utils/config.js";

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;

  if (!token) return res.status(401).json({msg: "no token, authorization denied "});

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({msg: "invalid token"});

        req.user = user;

        next();
    })  
}