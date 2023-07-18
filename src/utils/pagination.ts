
const pagination = (resultperPage:number,page:number):number=>{
    const pageNumber:number = page || 1;
    const skip = resultperPage * (pageNumber -1);
    return skip;
}

export default pagination;