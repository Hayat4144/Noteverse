import React, { Fragment } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '../Icons';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Descendant } from 'slate';
import { TypographyH3 } from '../ui/Heading';

interface NotebookCardProps {
  notebookCard: [];
  oldNotebookCardData: [];
}
interface NotebookContentCardProps {
  notebookCard: [];
}

export default function NotebookCard({
  notebookCard,
  oldNotebookCardData,
}: NotebookCardProps) {
  return (
    <Card className="col-span-4 h-80">
      <CardHeader className="py-2 capitalize">
        <CardTitle className="flex items-center space-x-2">
          <span> Notebook</span> <Icons.chevronRight />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent" className="px-0">
          <TabsList className="px-0 bg-transparent">
            <TabsTrigger
              value="recent"
              className="data-[state=active]:bg-muted"
            >
              Recent
            </TabsTrigger>
            <TabsTrigger value="old" className="data-[state=active]:bg-muted">
              Old
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="relative">
            <ScrollArea>
              <div className="flex items-center space-x-2 pb-4">
                <Content notebookCard={notebookCard} />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="old" className="relative">
            <ScrollArea>
              <div className="flex items-center space-x-2 pb-4">
                <Content notebookCard={oldNotebookCardData} />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

const Content = ({ notebookCard }: NotebookContentCardProps) => {
  return (
    <Fragment>
      {notebookCard.length > 0 ? (
        notebookCard.map((item: any) => (
          <Card key={item.id} className="w-[180px] h-52  overflow-hidden">
            <CardHeader className="p-2">
              <CardTitle className="text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              {item.content ? (
                <ContentComponent content={item.content} />
              ) : (
                'No content is added until.'
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <TypographyH3>Oops, There is not Notebook added yet now. </TypographyH3>
      )}
    </Fragment>
  );
};

interface ContentProps {
  content: Descendant[];
}

const ContentComponent = ({ content }: ContentProps) => {
  const firstItem: any = content[0];
  const validTypes = [
    'paragraph',
    'heading',
    'headingTwo',
    'headingThree',
    'headingFour',
    'headingFive',
    'headingSix',
  ];

  if (!validTypes.includes(firstItem.type)) return null;

  // Find the first occurrence of item.text
  const firstTextItem = firstItem.children.find((item: any) => item.text);

  return (
    <Fragment>
      {firstTextItem && <p>{firstTextItem.text.substring(0, 70)}</p>}
    </Fragment>
  );
};
