import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  projectId: string;
  createdAt: Date;
}

interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
  userId: string; // Projenin hangi kullanıcıya ait olduğunu tutacak
}

interface ProjectStore {
  projects: Project[];
  tasks: Task[];
  selectedProjectId: string | null;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'userId'>) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  getProjectTasks: (projectId: string) => Task[];
  getProjectStats: (projectId: string) => {
    todo: number;
    inProgress: number;
    done: number;
    progress: number;
  };
  selectProject: (projectId: string) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      tasks: [],
      selectedProjectId: null,

      addProject: (projectData) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        const newProject: Project = {
          id: crypto.randomUUID(),
          ...projectData,
          createdAt: new Date(),
          userId: user.id,
        };

        set((state) => ({
          projects: [...state.projects, newProject],
        }));
      },

      addTask: (taskData) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          ...taskData,
          createdAt: new Date(),
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },

      updateTaskStatus: (taskId, status) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status } : task
          ),
        }));
      },

      getProjectTasks: (projectId) => {
        return get().tasks.filter((task) => task.projectId === projectId);
      },

      getProjectStats: (projectId) => {
        const tasks = get().getProjectTasks(projectId);
        const todo = tasks.filter((t) => t.status === 'todo').length;
        const inProgress = tasks.filter((t) => t.status === 'inProgress').length;
        const done = tasks.filter((t) => t.status === 'done').length;
        const total = tasks.length;

        return {
          todo,
          inProgress,
          done,
          progress: total > 0 ? (done / total) * 100 : 0,
        };
      },

      selectProject: (projectId) => {
        set({ selectedProjectId: projectId });
      },
    }),
    {
      name: 'project-storage',
    }
  )
); 