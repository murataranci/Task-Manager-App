import { memo, type FC } from 'react';
import { useTaskStore } from '@/store/useTaskStore';
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal';
import { TaskColumn } from '@/components/tasks/TaskColumn';
import { useLanguageStore } from '@/store/useLanguageStore';
import { t } from '@/utils/i18n';

export const Dashboard: FC = memo(() => {
  const { tasks, addTask, isCreateModalOpen, closeCreateModal } = useTaskStore();
  const currentLang = useLanguageStore((state) => state.currentLang);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gradient tracking-tight">
          {t('nav.dashboard', currentLang)}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <TaskColumn
          title={t('kanban.todo', currentLang)}
          status="TODO"
          tasks={tasks.filter((task) => task.status === 'TODO')}
          className="min-h-[calc(100vh-16rem)] md:min-h-[calc(100vh-12rem)]"
        />
        <TaskColumn
          title={t('kanban.inProgress', currentLang)}
          status="IN_PROGRESS"
          tasks={tasks.filter((task) => task.status === 'IN_PROGRESS')}
          className="min-h-[calc(100vh-16rem)] md:min-h-[calc(100vh-12rem)]"
        />
        <TaskColumn
          title={t('kanban.done', currentLang)}
          status="DONE"
          tasks={tasks.filter((task) => task.status === 'DONE')}
          className="min-h-[calc(100vh-16rem)] md:min-h-[calc(100vh-12rem)]"
        />
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSubmit={addTask}
      />
    </div>
  );
});

Dashboard.displayName = 'Dashboard'; 