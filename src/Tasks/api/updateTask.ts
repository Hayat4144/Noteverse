import { createTaskInput } from "@/types";
import { httpStatusCode } from "@/types/httpStatusCode";
import taskObject from "@/utils/TaskObject";
import asyncHandler from "@/utils/asyncHandler";
import { Response,Request,NextFunction } from "express";

interface taskBody {
    id:string,
    data:createTaskInput
}

const updateTask = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {id,data} =req.body as taskBody;
    const updatedTask = await taskObject.findByIdAndUpdate(id,data,req.user_id);
    if(!updatedTask) return res.status(httpStatusCode.BAD_REQUEST).json({error:'Task does not exist.'})
    return res.status(httpStatusCode.OK).json({data:updatedTask})
})

export default updateTask;