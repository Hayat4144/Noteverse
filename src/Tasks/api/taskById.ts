import { httpStatusCode } from "@/types/httpStatusCode";
import taskObject from "@/utils/TaskObject";
import { Response,Request,NextFunction } from "express";

const FindtaskById =async (req:Request,res:Response,next:NextFunction) => {
    const {id} =req.params;
    const isTask = await taskObject.getTaskById(id,req.user_id)
    if(!isTask) return res.status(httpStatusCode.BAD_REQUEST).json({error:'Task does not exist.'});
    return res.status(httpStatusCode.OK).json({data:isTask})
}

export default FindtaskById;