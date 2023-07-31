import { Icons } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ActionTypes } from '@/context/actions';
import { useAppDispatch} from '@/hooks';
import React, { Fragment, useState } from 'react';

interface TagsProps {
  filterId: string;
  field: string;
}

export default function TagsFilter({ filterId, field }: TagsProps) {
  const [isKeyReleased, setisKeyReleased] = useState(false);
  const [tasktags, settasktags] = useState<string[]>([]);
  const [inputValue, setinputValue] = useState('');
  const dispatach = useAppDispatch();

  const deleteTag = (index: number) => {
    settasktags((prevState) => {
      const updatedTags = prevState.filter((tag, i) => i !== index);
      dispatach({
        type: ActionTypes.addFilter,
        payload: { field, id: filterId, value: updatedTags },
      });
      return updatedTags;
    });
  };

  const onkeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const trimedInput = inputValue.trim();
    const IsCreatetag =
      key === 'Enter' && trimedInput.length && !tasktags.includes(trimedInput);
    if (IsCreatetag) {
      e.preventDefault();
      settasktags((prevTags) => {
        const tags = [...prevTags, trimedInput];
        dispatach({
          type: ActionTypes.addFilter,
          payload: { field, id: filterId, value: tags },
        });
        return [...prevTags, trimedInput];
      });
      setinputValue('');
    }

    setisKeyReleased(false);
  };

  const onkeyuphandler = () => {
    setisKeyReleased(true);
  };

  return (
    <Fragment>
      <div className="border rounded-md px-2 py-1 my-2">
        <div className="badges w-full space-x-1 space-y-1">
          {tasktags.map((tag, index) => (
            <Badge
              variant={'secondary'}
              key={index}
              className="rounded-sm px-2 space-x-1
                       hover:bg-none"
            >
              <span>{tag}</span>
              <Icons.close
                size={15}
                className="cursor-pointer"
                onClick={() => deleteTag(index)}
              />
            </Badge>
          ))}
        </div>
        <Input
          placeholder="Search by tags"
          value={inputValue}
          className="border-none outline-none focus:border-none focus:outline-none
                    focus-visible:ring-transparent"
          onChange={(e) => setinputValue(e.target.value)}
          onKeyDown={(e) => onkeyDownHandler(e)}
          onKeyUp={onkeyuphandler}
        />
      </div>
      <p className='text-sm'>Note: press enter to create a tag.</p>
    </Fragment>
  );
}
