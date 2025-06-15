// Task storage logic (get/save from localStorage)

export type TaskStatus = 'pending' | 'in progress' | 'completed' | 'rejected';

export type TaskPriority = 'low' | 'medium' | 'high'; 

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdBy: string;
  assignedTo: string;
  priority: TaskPriority; 
  timeSpent: number;
};

// Load all tasks from localStorage
export function getTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Save all tasks to localStorage
export function saveTasks(tasks: Task[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Add a new task
export function addTask(task: Task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
}

// Update a task's status (Manager use case)
export function updateTaskStatus(taskId: string, status: TaskStatus) {
  const tasks = getTasks().map((task) =>
    task.id === taskId ? { ...task, status } : task
  );
  saveTasks(tasks);
}

// Get tasks by role
export function getTasksByUserRole(role: string, userEmail: string): Task[] {
  const tasks = getTasks();
  return role === 'manager'
    ? tasks
    : tasks.filter((task) => task.createdBy === userEmail);
}

// Update timeSpent for a task
export function updateTaskTime(taskId: string, additionalSeconds: number) {
  const updatedTasks = getTasks().map((task) =>
    task.id === taskId
      ? { ...task, timeSpent: (task.timeSpent || 0) + additionalSeconds }
      : task
  );
  saveTasks(updatedTasks);
}
