import { NextFunction ,Request,Response} from "express";
import jwt from "jsonwebtoken";
const key ="123"
function auth(req:Request,res:Response,next:NextFunction){
    try{const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    // console.log(authHeader);
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,key);
    //@ts-ignore
    req.userId = decoded.id;
    next()
}
    catch(error){
        res.status(403).json({ message: "Invalid token" });
    }
} 

export default auth;