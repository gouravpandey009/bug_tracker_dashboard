'use client';

import { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Task } from '../lib/tasks';

export default function DeveloperDashboard() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const clearEdit = () => setEditingTask(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 sm:px-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 tracking-tight">
            Developer Dashboard
          </h1>
          <p className="text-gray-600 text-sm">
            Create, view, and manage your tasks efficiently
          </p>
        </div>

        {/* Task Form */}
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 mb-10 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            {editingTask ? 'Update Task' : 'Create a New Task'}
          </h2>
          <TaskForm editingTask={editingTask} clearEdit={clearEdit} />
        </div>

        {/* Task List */}
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Tasks</h2>
          <TaskList role="developer" onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
}
