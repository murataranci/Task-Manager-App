import { memo, type FC } from 'react';
import { Task } from '@/types/task';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: FC<TaskCardProps> = memo(({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-background/60 backdrop-blur-sm p-4 rounded-lg cursor-move hover:bg-background/80 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <h4 className="font-medium text-sm md:text-base line-clamp-2">{task.title}</h4>
      {task.description && (
        <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="flex items-center justify-between mt-3">
        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <span className="text-xs text-muted-foreground">
          {format(new Date(task.dueDate), 'MMM d')}
        </span>
      </div>
    </motion.div>
  );
});

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-500/20 text-red-500';
    case 'MEDIUM':
      return 'bg-yellow-500/20 text-yellow-500';
    case 'LOW':
      return 'bg-green-500/20 text-green-500';
    default:
      return 'bg-gray-500/20 text-gray-500';
  }
};

TaskCard.displayName = 'TaskCard'; 