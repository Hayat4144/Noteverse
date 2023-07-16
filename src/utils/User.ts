import prisma from "@/config/databaseConfig";
import prismaExclude from "./prismaExclude";

class User{
    private readonly userId:string
    constructor(id:string){
        this.userId = id;
    }
    async isUserExist(){
        const isUser = await prisma.user.findUnique({
            where:{id:this.userId},
            select:prismaExclude('User',['password'])
        })
        if(!isUser) return null;
        return isUser;
    }
    
}

export default User;