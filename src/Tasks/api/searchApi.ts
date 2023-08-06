import { httpStatusCode } from '@/types/httpStatusCode';
import taskObject from '@/utils/TaskObject';
import asyncHandler from '@/utils/asyncHandler';
import { Response, Request, NextFunction } from 'express';
import { URL } from 'url';
import filterSort from '@/utils/filterSort';
import pagination from '@/utils/pagination';
import { filtersQuery, sort } from '@/utils/SearchQuery';

const searchApi = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search } = new URL(req.url, `http://${req.headers.host}`);
    const { filters, Sorts } = filterSort(search);
    let { page }: any = req.query;
    page = Number(page);
    const sortIn = sort(Sorts);
    const skip = pagination(20, page);
    if (filters.length < 1) {
      const tasks = await taskObject.getTask(req.user_id, sortIn, skip);
      const responseObject = {
        totalResults: tasks[1],
        data: tasks[0],
        resultPerPage: 20,
      };
      return res.status(httpStatusCode.OK).json(responseObject);
    }
    const filterQueries = filtersQuery(filters);
    const tasks = await taskObject.searchApifilters(
      { userId: req.user_id, ...filterQueries },
      sortIn,
      skip,
    );
    const responseObject = {
      totalResults: tasks[1],
      data: tasks[0],
      resultPerPage: 20,
    };
    return res.status(httpStatusCode.OK).json(responseObject);
  },
);

export default searchApi;
