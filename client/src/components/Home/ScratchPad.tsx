import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScratchPadEditor from './ScratchPadEditor';

export default function ScratchPad() {
  return (
    <Card className="h-80 col-span-2">
      <CardHeader className="py-3 capitalize">
        <CardTitle>Scratchpad</CardTitle>
      </CardHeader>
      <CardContent>
        <ScratchPadEditor />
      </CardContent>
    </Card>
  );
}
