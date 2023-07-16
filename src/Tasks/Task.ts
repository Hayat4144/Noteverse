import prisma from "@/config/databaseConfig";
import { createTaskInput } from "@/types";
import { Task as PrismaTask } from "@prisma/client";

class Task{
    async createTask(taskData:createTaskInput){
        const newtask = await prisma.task.create({
            data:{...taskData} 
        }) 
        if(newtask){
            return newtask;
        }
    }
    async getTaskById(id:string):Promise<PrismaTask | null>{
        const isTaskExist = await this.isTaskExist(id);
        return isTaskExist ;
    }
    async findByIdAndUpdate(id:string,taskData:createTaskInput):Promise<PrismaTask | null>{
        const isTaskExist = await this.isTaskExist(id);
        if(!isTaskExist) return null;
        const updatedTask = await prisma.task.update({
            where:{id:isTaskExist.id},
            data:{...taskData}
        })
        return updatedTask ;
    }
    private async isTaskExist(id:string):Promise<PrismaTask | null>{
        const taskExist = await prisma.task.findUnique({
            where:{id}
        })
        if(!taskExist) return null;
        return taskExist;
    }
    async findByIdAndDelete(id:string):Promise<{title:string} | null>{
        const isTaskExist = await this.isTaskExist(id);
        if(!isTaskExist) return null;
        const deletedTask = await prisma.task.delete({
            where:{id},
            select:{
                title:true
            }
        })
        return deletedTask ;
    }
}

export default Task;