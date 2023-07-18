import { SeachFrilters, SearchSort } from "@/types";

const filtersQuery = (filters:SeachFrilters[])=>{
    let filterQuery: any = {};
    // const IncaseSensitive ={mode:'insensitive'}
    filters.forEach((filter) => {
      const filterOperatorValue:any= { [filter.opt]: filter.value };
  
     // Check if the filter value is a number and convert it to a number if needed
      const reg = new RegExp('^[0-9]+$'); 
      if(reg.test(filter.value)){
        if(!isNaN(Number(filter.value))){
          filterOperatorValue[filter.opt] = Number(filter.value) 
        }
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
        filterQuery[filter.field] = {...filterOperatorValue};
      }
    });
  
    return filterQuery;
}


const sort  = (Sorts:SearchSort [])=>{
    // default sorting by id in ascending order
    let  sortIn:any = {};
    if(Sorts.length > 0){
      Sorts.map((item)=>{
        sortIn[item.field]  = item.value;
      })    
    }
    else{
      sortIn['id'] = 'asc'
    }  
    return sortIn;
  }

export {filtersQuery,sort};