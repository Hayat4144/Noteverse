import { httpStatusCode } from "@/types/httpStatusCode";
import asyncHandler from "@/utils/asyncHandler";
import { verifyToken } from "@/utils/jwt";
import { NextFunction, Request, Response } from "express";

const authMiddleware = asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) return res.status(httpStatusCode.UNAUTHORIZED).json({error:'you are unauthorized.'})
    const isValidatoken = await verifyToken(token,10)
    if(!isValidatoken) return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({error:'Something went wrong.'})
    req.user_id = isValidatoken.id;
    req.email = isValidatoken.email;
    req.name = isValidatoken.name;
    next()
})

export default authMiddleware;