import {
  IncaseSensitiveOperators,
  PrismaOperators,
  SeachFrilters,
  SearchSort,
} from '@/types';

const filtersQuery = (filters: SeachFrilters[]) => {
  let filterQuery: any = {};
  const numberRegex = new RegExp('^[0-9]+$');
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const arrayRegex = /^\[.*\]$/;
  const IncaseSensitive = { mode: 'insensitive' };

  const incaseSensitiveOpertaors: IncaseSensitiveOperators[] = [
    PrismaOperators.contains,
    PrismaOperators.endsWith,
    PrismaOperators.startsWith,
  ];

  filters.forEach((filter) => {
    // check if the filter value is conatains array
    if (arrayRegex.test(filter.value)) {
      filter.value = filter.value.trim();
      filter.value = JSON.parse(filter.value);
    }
    const filterOperatorValue: any = { [filter.opt]: filter.value };

    // Check if the filter value is a number and convert it to a number if needed
    if (numberRegex.test(filter.value)) {
      if (!isNaN(Number(filter.value))) {
        filterOperatorValue[filter.opt] = Number(filter.value);
      }
    }

    // check is filter value is date
    if (dateRegex.test(filter.value)) {
      const dateObject = new Date(filter.value).toISOString();
      filterOperatorValue[filter.opt] = dateObject;
    }

    if (filterQuery[filter.field]) {
      // Merge the existing filter with the new filterOperatorValue
      filterQuery[filter.field] = {
        ...filterQuery[filter.field],
        ...filterOperatorValue,
        // ...IncaseSensitive
      };
    } else {
      // Create a new entry for the field in filterQuery
      filterQuery[filter.field] = { ...filterOperatorValue };
    }
    if (
      incaseSensitiveOpertaors.includes(filter.opt as IncaseSensitiveOperators)
    ) {
      filterQuery[filter.field] = {
        ...filterQuery[filter.field],
        ...IncaseSensitive,
      };
    }
  });
  return filterQuery;
};

const sort = (Sorts: SearchSort[]) => {
  // default sorting by title in ascending order
  let sortIn: any = {};
  if (Sorts.length > 1) {
    return Sorts.map((item) => {
      return { [item.field]: item.value };
    });
  } else if (Sorts.length === 1) {
    Sorts.map((item) => {
      sortIn[item.field] = item.value;
    });
    return sortIn;
  } else {
    sortIn['title'] = 'asc';
    return sortIn;
  }
};

export { filtersQuery, sort };
