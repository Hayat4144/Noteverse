import { SeachFrilters, SearchSort } from '@/types';
import { httpStatusCode } from "@/types/httpStatusCode";
import taskObject from "@/utils/TaskObject";
import asyncHandler from "@/utils/asyncHandler";
import { Response,Request,NextFunction } from "express";
import {URL} from  'url'
import filterSort from "@/utils/filterSort";
import pagination from '@/utils/pagination';
import logger from '@/utils/logger';
import { filtersQuery, sort } from '@/utils/SearchQuery';



const searchApi = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
  const {search} = new URL(req.url,`http://${req.headers.host}`)
  const {filters,Sorts} = filterSort(search)
  let {page}:any = req.query;
  page = Number(page)
  const sortIn = sort(Sorts)
  const skip = pagination(2,page)
  if(filters.length < 1){ 
    const tasks = await taskObject.getTask(req.user_id,sortIn,skip);
    if(!tasks) return res.status(httpStatusCode.OK).json({error:"you have not added tasks."})
    return res.status(httpStatusCode.OK).json({data:tasks})
  }
  const filterQueries = filtersQuery(filters)
  const tasks = await taskObject.searchApifilters(filterQueries)   
  return res.status(httpStatusCode.OK).json({data:tasks})

})





export default searchApi;
