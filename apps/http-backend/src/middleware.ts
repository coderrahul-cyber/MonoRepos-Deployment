import { NextFunction , Request , Response } from "express";
import jwt from "jsonwebtoken";
import { JWTTOKENSECRET } from "@repo/backend-common/config";
interface NewRequest extends Request{
    userId?:string
} 
interface JwtPayload{
    userId : string
}
export function middleware(req:NewRequest , res:Response , next:NextFunction){
  const token = req.headers["authorization"] ?? "";
  const decoded  = jwt.verify(token , JWTTOKENSECRET) as JwtPayload;
  if(decoded){
    req.userId = decoded.userId;
    next();
  }else{
    res.status(401).json({
        message : "Unauthorized"
    });
  }
}