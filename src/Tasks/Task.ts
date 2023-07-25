import prisma from "@/config/databaseConfig";
import { createTaskInput } from "@/types";
import { Task as PrismaTask } from "@prisma/client";

class Task{
    async createTask(taskData:createTaskInput,userId:string){
        const newtask = await prisma.task.create({
            data:{...taskData,user:{connect:{id:userId}}} 
        }) 
        if(newtask){
            return newtask;
        }
    }
    async getTaskById(id:string,userId:string):Promise<PrismaTask | null>{
        const isTaskExist = await this.isTaskExist(id,userId);
        return isTaskExist ;
    }
    async findByIdAndUpdate(id:string,taskData:createTaskInput,userId:string):Promise<PrismaTask | null>{
        const isTaskExist = await this.isTaskExist(id,userId);
        if(!isTaskExist) return null;
        const updatedTask = await prisma.task.update({
            where:{id:isTaskExist.id},
            data:{...taskData}
        })
        return updatedTask ;
    }
    private async isTaskExist(id:string,userId:string):Promise<PrismaTask | null>{
        const taskExist = await prisma.task.findUnique({
            where:{id,userId}
        })
        if(!taskExist) return null;
        return taskExist;
    }
    async findByIdAndDelete(id:string,userId:string):Promise<{title:string} | null>{
        const isTaskExist = await this.isTaskExist(id,userId);
        if(!isTaskExist) return null;
        const deletedTask = await prisma.task.delete({
            where:{id},
            select:{
                title:true
            }
        })
        return deletedTask ;
    }
    async getTask(userId:string,sortIn:object,skip:number){
        const tasks = await prisma.task.findMany({
            take:20,
            skip,
            where:{userId},
            orderBy:sortIn
        })
        return tasks
    }
    async searchApifilters(filterQuery:object,sortQuery:object,skip:number){
        console.log(filterQuery)
        const tasks = await prisma.task.findMany({
            take:20,
            skip,
            where:filterQuery,
            orderBy:sortQuery
        })
        return tasks
    }
}

export default Task;