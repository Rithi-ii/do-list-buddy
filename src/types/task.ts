export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completedToday: number;
}