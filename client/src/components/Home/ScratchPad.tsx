import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScratchPadEditor from './ScratchPadEditor';
import { ScrollArea } from '../ui/scroll-area';

export default function ScratchPad() {
  return (
    <Card className="col-span-2">
      <ScrollArea className="h-80">
        <CardHeader className="py-3 capitalize">
          <CardTitle>Scratchpad</CardTitle>
        </CardHeader>
        <CardContent>
          <ScratchPadEditor />
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
