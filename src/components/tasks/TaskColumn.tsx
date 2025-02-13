import { memo, type FC } from 'react';
import { useDrop } from 'react-dnd';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { useTaskStore } from '@/store/useTaskStore';

interface TaskColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  className?: string;
}

export const TaskColumn: FC<TaskColumnProps> = memo(({ title, status, tasks, className }) => {
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: Task) => {
      updateTaskStatus(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bg-secondary/30 backdrop-blur-sm rounded-lg p-4 ${
        isOver ? 'ring-2 ring-primary/50' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gradient">{title}</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
});

TaskColumn.displayName = 'TaskColumn'; 