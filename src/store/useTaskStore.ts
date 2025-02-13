import { create } from 'zustand';
import type { Task, TaskFormData } from '@/types/task';

interface TaskStore {
  tasks: Task[];
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  addTask: (taskData: TaskFormData) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  getStatistics: () => {
    total: number;
    completed: number;
    inProgress: number;
    completion: number;
  };
}

export const useTaskStore = create<TaskStore>()((set, get) => ({
  tasks: [],
  isCreateModalOpen: false,
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
  addTask: (taskData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      status: 'TODO',
      createdBy: 'current-user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  updateTaskStatus: (taskId, status) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      ),
    }));
  },
  getStatistics: () => {
    const tasks = get().tasks;
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'DONE').length;
    const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
    const completion = total ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, completion };
  },
})); 