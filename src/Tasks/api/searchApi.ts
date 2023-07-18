import { httpStatusCode } from "@/types/httpStatusCode";
import taskObject from "@/utils/TaskObject";
import asyncHandler from "@/utils/asyncHandler";
import { Response,Request,NextFunction } from "express";
import {URL} from  'url'
import querystring from 'querystring'
import logger from "@/utils/logger";

const searchApi = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
const {search} = new URL(req.url,`http://${req.headers.host}`)
   console.log('search')
   const m  = querystring.unescape(search)
   console.log(m)
   const escaprestring = querystring.escape('filter=dueDate:lt:2020-05-11T07::00::00.000Z&filter=price:lte:100&sort_by=desc(last_modified),asc(email)')
//    console.log('escapestring',escaprestring)
  return res.status(200).send('ok')
    // return res.status(200).json({query,data:typeof query})
})

export default searchApi;
