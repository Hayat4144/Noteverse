import { filterobject } from '@/types';
import { BASE_URL } from './BASE_URL';
import { CreateFilterQuery, CreateSortQuery } from './CreateQuery';

export const TaskUrl = (sorts: [], filter: filterobject[]): string => {
  let url = `${BASE_URL}/api/search/task`;
  const sortQuery = CreateSortQuery(sorts);
  const filterQuery = CreateFilterQuery(filter);
  if (sortQuery.length > 0 || filterQuery.length > 0) {
    url += '?';
    if (sortQuery.length > 0) {
      url += `sort_by=${sortQuery}`;
    }
    if (sortQuery.length > 0 && filterQuery.length > 0) {
      url += '&';
    }

    if (filterQuery.length > 0) {
      url += `filter=${filterQuery}`;
    }
  }
  return url;
};
