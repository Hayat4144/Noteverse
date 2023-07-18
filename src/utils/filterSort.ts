import { SeachFrilters ,SearchSort} from "@/types";
import { CustomError } from "./CustomError"
import querystring , {ParsedUrlQuery} from 'querystring'

interface filterSortResult {
    filters: SeachFrilters[];
    Sorts: SearchSort[];
  }

const filterSort = (searchParmas:string):filterSortResult=>{
    try {
        const unescapeSearchParams = querystring.unescape(searchParmas.slice(1));
        const parsedQuery: ParsedUrlQuery = querystring.parse(unescapeSearchParams);

        // Destructure the parsedQuery object with proper types
        let { filter, sort_by } = parsedQuery as { filter?: string | string[]; sort_by?: string};

        let filters :SeachFrilters[] = [];
        let Sorts :SearchSort[] = []

        if (filter) {
            // If filter is a string, convert it to an array
            filter = Array.isArray(filter) ? filter : [filter];
            // Now, filterData contains an array of strings (or an empty array if filter is undefined)
            filter.map((items:string) => {
                const [field,opt,value] = items.split(':')
                filters.push({field,opt,value})
            });
        }

        if(sort_by){
            // conver the sort into an array by splitting
            const data = sort_by.split(",")
            
            // get the field and ordery_by value by splitting "(" and then remove last parantehis from field
            data.map(item=>{
              let [value,field]= item.split("(")
              field = field.substring(0,field.length -1)
              Sorts.push({field,value})
            })
          }

        return {filters,Sorts}
    } catch (error:any) {
        throw new CustomError(error.message,400)
    }
}

export default filterSort;