import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { getAccessToken, verifyToken } from "../utils/jwt";
import { httpStatusCode } from "../types/httpStatusCode";

const RefreshAccessToken = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {refreshtoken} = req.body;
    const {id,name,email,roleId,created_at} = await verifyToken(refreshtoken,30);
    const token = await getAccessToken({id,name,email,roleId,created_at})
    return res.status(httpStatusCode.OK).json({AccessToken:token,Refreshtoken:refreshtoken})
})

export default RefreshAccessToken;