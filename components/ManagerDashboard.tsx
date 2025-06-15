'use client';

import { useEffect, useState } from 'react';
import { Task, getTasks, updateTaskStatus, saveTasks } from '../lib/tasks';

export default function ManagerDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    updateTaskStatus(taskId, status);
    setTasks(getTasks());
  };

  const handleDelete = (id: string) => {
    const updated = tasks.filter((task) => task.id !== id);
    saveTasks(updated);
    setTasks(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
      {tasks.length === 0 && <p className="text-gray-500">No tasks found.</p>}

      {tasks.map((task) => (
        <div key={task.id} className="border p-4 mb-4 rounded shadow bg-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">{task.title}</h3>
              <p className="text-sm text-gray-700">{task.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Assigned To: <b>{task.assignedTo}</b>
              </p>
              <p className="text-xs text-gray-500">
                Created By: <b>{task.createdBy}</b>
              </p>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <select
                className="text-sm border px-2 py-1 rounded"
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(task.id, e.target.value as Task['status'])
                }
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-600 text-xs hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
