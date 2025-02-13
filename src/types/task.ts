export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | Date;
  assignedTo?: string;
  createdBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate: string;
} 