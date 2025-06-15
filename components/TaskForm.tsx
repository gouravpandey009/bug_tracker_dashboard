'use client';

import { useEffect, useState } from 'react';
import { addTask, Task, saveTasks, getTasks } from '../lib/tasks';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  editingTask?: Task | null;
  clearEdit?: () => void;
}

export default function TaskForm({ editingTask  , clearEdit}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Auto-fill form if editingTask is provided
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user?.email) {
      alert('User not logged in!');
      return;
    }

    if (editingTask) {
  // Update existing task
  const updatedTask: Task = {
    ...editingTask,
    title,
    description,
    priority,
  };

  const existingTasks = getTasks();
  const updatedTasks = existingTasks.map((t) =>
    t.id === editingTask.id ? updatedTask : t
  );

  saveTasks(updatedTasks);
  alert('Task updated!');
  clearEdit?.(); 
} else {
  //Create new task
  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    status: 'pending',
    createdBy: user.email,
    assignedTo: 'manager@fealty.com',
    priority,
    timeSpent: 0,
  };

  addTask(newTask);
  alert('Task created successfully!');
}

    // Clear form
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {editingTask ? 'Edit Task' : 'Create New Task'}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-3 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 mb-3 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        className="w-full p-2 mb-3 border rounded"
        required
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {editingTask ? 'Update Task' : 'Submit Task'}
      </button>
    </form>
  );
}
