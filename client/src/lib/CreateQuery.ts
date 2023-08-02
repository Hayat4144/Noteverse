import { filterobject, sortObject } from '@/types';

export const CreateSortQuery = (sort: any[]): string => {
  if (!Array.isArray(sort) || sort.length === 0) {
    return '';
  }
  const result = sort.map((obj) => `${obj.value}(${obj.field})`).join(',');
  return result;
};

export const CreateFilterQuery = (filter: filterobject[]) => {
  if (filter.length < 1) {
    return '';
  }

  const filterquery = filter
    .filter((item) => item.value.length > 0) // Filter out items with an empty value
    .map((item) => `${item.field}:${item.operator}:${item.value}`)
    .join('&filter=');

  return filterquery;
};
