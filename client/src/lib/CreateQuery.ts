import { TaskStatus, filterobject, sortObject, taskField } from '@/types';
import { format, parseISO } from 'date-fns';

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
    .map((item) => {
      if (item.field === taskField.due_date) {
        let formatedDate;
        if (typeof item.value === 'string') {
          formatedDate = format(parseISO(item.value), 'yyyy-MM-dd');
        }
        return `${item.field}:${item.operator}:${formatedDate}`;
      }
      if (item.field === taskField.tags && Array.isArray(item.value)) {
        const formattedValues = item.value.map((val) => `"${val}"`).join(',');
        const query = `${item.field}:${item.operator}:[${formattedValues}]`;
        return query;
      }
      return `${item.field}:${item.operator}:${item.value}`;
    })
    .join('&filter=');

  return filterquery;
};
