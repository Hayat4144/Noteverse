import { createTaskInput } from "@/types";
import asyncHandler from "@/utils/asyncHandler";
import { NextFunction, Request, Response } from "express";
import Task from "../Task";

const taskObject = new Task();

const createTask = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const data:createTaskInput = req.body;
    const task = await taskObject.createTask(data,req.user_id);
    return res.status(200).json({data:task})
})

export default createTask;