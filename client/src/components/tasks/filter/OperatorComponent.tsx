import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { filterobject } from '@/types';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch} from '@/hooks'

interface OperatorComponentProps {
  operators: string[];
  item: filterobject;
}

const OperatorComponent = ({ operators, item }: OperatorComponentProps) => {
  const dispatch = useAppDispatch();
  const operatorChange = (value: string, field: string, id: string) => {
    dispatch({
      type: ActionTypes.addFilter,
      payload: { id, field, operator: value },
    });
  };
  return (
    <Select
      defaultValue={item.operator}
      onValueChange={(value) => {
        operatorChange(value, item.field, item.id);
      }}
    >
      <SelectTrigger className="w-fit px-2 h-6 text-sm border-none hover:bg-slate-800">
        <SelectValue className="py-1" />
      </SelectTrigger>
      <SelectContent className="">
        {operators.map((operator, index) => (
          <SelectItem value={operator} key={index} className="text-sm">
            {operator}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};


export default OperatorComponent;