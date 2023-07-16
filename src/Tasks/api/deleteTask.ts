import { httpStatusCode } from "@/types/httpStatusCode";
import taskObject from "@/utils/TaskObject";
import asyncHandler from "@/utils/asyncHandler";
import { Response,Request,NextFunction } from "express";


const deleteTask = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params ;
    const deletedTask = await taskObject.findByIdAndDelete(id);
    if(!deletedTask) return res.status(httpStatusCode.BAD_REQUEST).json({error:'Task does not exist'});
    return res.status(httpStatusCode.OK).json({data:`${deletedTask?.title} has been deleted successfully.`})
})

export default deleteTask;