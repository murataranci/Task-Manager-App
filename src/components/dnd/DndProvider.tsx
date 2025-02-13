import { memo, type FC, type PropsWithChildren } from 'react';
import { DndProvider as ReactDndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// PropsWithChildren kullanarak interface'i basitleştirelim
type DndProviderProps = PropsWithChildren;

export const DndProvider: FC<DndProviderProps> = memo(({ children }) => {
  return <ReactDndProvider backend={HTML5Backend}>{children}</ReactDndProvider>;
});

// Debugging için display name ekleyelim
DndProvider.displayName = 'DndProvider'; 