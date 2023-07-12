
interface JwtPayload {
    id:string,
    name:string,
    email:string,
    roleId:string,
    created_at:Date,
    iat:number,
    exp:number
}