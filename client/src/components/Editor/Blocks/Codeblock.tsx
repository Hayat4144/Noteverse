'use client';
import React, { useState } from 'react';
import { RenderElementProps } from 'slate-react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/Icons';
import { toast } from '@/components/ui/use-toast';

const Codeblock = (
  props: RenderElementProps & { style?: React.CSSProperties },
) => {
  const handleCopy = async () => {
    const code = props.element.children
      .map((child: any) => child.text)
      .join('\n');
    await navigator.clipboard.writeText(code);
  };

  return (
    <pre
      className="mt-2 max-h-[650px] w-[800px] overflow-y-auto p-4 border
      rounded-md whitespace-pre-wrap relative bg-zinc-950 dark:bg-zinc-900
      my-4"
      style={props.style}
      {...props.attributes}
    >
      <code
        spellCheck={false}
        className={`language-${(props.element as any).language} font-mono`}
      >
        {props.children}
      </code>
      {/* <LanguageSelect
        language={(props.element as any).language}
        element={props.element}
      /> */}
      <CopyButton handleCopy={handleCopy} />
    </pre>
  );
};

interface CopyButtonProps {
  handleCopy: () => void;
}
const CopyButton = ({ handleCopy }: CopyButtonProps) => {
  const [isCopy, setisCopy] = useState(false);
  const handleCopyButton = async () => {
    handleCopy();
    setisCopy(true);
    toast({ title: 'Code has been successfully to your clipborad. ' });
    setTimeout(() => setisCopy(false), 4000);
  };
  return (
    <div
      className={`absolute
          right-[5px]
          top-[5px]
          z-10`}
    >
      <Button size={'icon'} variant={'ghost'} onClick={handleCopyButton}>
        {isCopy ? (
          <Icons.check size={17} className="text-green-700" />
        ) : (
          <Icons.copy size={17} />
        )}
      </Button>
    </div>
  );
};

// const LanguageSelect = ({ language, element }: languageProps) => {
//   const editor = useSlateStatic();
//   return (
//     <Fragment>
//       <div
//         data-test-id="language-select"
//         contentEditable={false}
//         className={`absolute
//           right-[5px]
//           top-[5px]
//           z-10`}
//       >
//         <Select
//           defaultValue={language}
//           onValueChange={(value) => {
//             const path = ReactEditor.findPath(editor, element);
//             Transforms.setNodes(editor, { language: value }, { at: path });
//           }}
//         >
//           <SelectTrigger className="w-fit  border-slate-600">
//             <SelectValue placeholder="Theme" />
//           </SelectTrigger>
//           <SelectContent>
//             {languages.map((language) => (
//               <SelectItem value={language.value} key={language.id}>
//                 {language.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     </Fragment>
//   );
// };

export default Codeblock;
