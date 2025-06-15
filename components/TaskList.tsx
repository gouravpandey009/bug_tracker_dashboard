'use client';

import { useEffect, useState, useRef } from 'react';
import {
    getTasks,
    saveTasks,
    Task,
    updateTaskStatus,
    TaskStatus,
} from '../lib/tasks';

interface TaskListProps {
    role: 'developer' | 'manager';
    onEdit: (task: Task) => void; 
}

export default function TaskList({ role , onEdit}: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [userEmail, setUserEmail] = useState<string>('');
    const [runningTaskId, setRunningTaskId] = useState<string | null>(null);
    const [tick, setTick] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('created');
    const [searchKeyword, setSearchKeyword] = useState<string>('');



    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsed = JSON.parse(user);
            setUserEmail(parsed.email);
        }

        const stored = getTasks();
        setTasks(stored);
    }, []);

    //Timer Tick
    useEffect(() => {
        if (runningTaskId) {
            intervalRef.current = window.setInterval(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === runningTaskId
                            ? { ...task, timeSpent: (task.timeSpent || 0) + 1 }
                            : task
                    )
                );
                setTick((t) => t + 1);
            }, 1000);
        }

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, [runningTaskId]);

    // Persist on tick
    useEffect(() => {
        if (tick > 0) saveTasks(tasks);
    }, [tick]);

    const handleDelete = (id: string) => {
        const updated = tasks.filter((task) => task.id !== id);
        saveTasks(updated);
        setTasks(updated);
    };

    const handleStatusChange = (id: string, newStatus: TaskStatus) => {
        updateTaskStatus(id, newStatus);
        setTasks(getTasks());
    };


    const toggleTimer = (taskId: string) => {
        if (runningTaskId === taskId) {
            setRunningTaskId(null);
        } else {
            setRunningTaskId(taskId);
        }
    };

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    let visibleTasks = role === 'manager'
        ? tasks
        : tasks.filter((task) => task.createdBy === userEmail);

    // Apply Filters
    if (filterStatus !== 'all') {
        visibleTasks = visibleTasks.filter((task) => task.status === filterStatus);
    }

    if (filterPriority !== 'all') {
        visibleTasks = visibleTasks.filter((task) => task.priority === filterPriority);
    }

    if (searchKeyword.trim() !== '') {
        const keyword = searchKeyword.toLowerCase();
        visibleTasks = visibleTasks.filter(
            (task) =>
                task.title.toLowerCase().includes(keyword) ||
                task.description.toLowerCase().includes(keyword)
        );
    }

    // Apply Sorting
    if (sortBy === 'priority') {
        const priorityOrder: Record<string, number> = { low: 1, medium: 2, high: 3 };
        visibleTasks = [...visibleTasks].sort(
            (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
    }


    if (visibleTasks.length === 0) {
        return <p className="text-center text-gray-500">No tasks available.</p>;
    }

    return (
        <>
            {role === 'developer' && (
                <div className="mb-4 flex flex-wrap gap-4">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="all">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="created">Sort by Created (Default)</option>
                        <option value="priority">Sort by Priority</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search by keyword"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </div>
            )}

            <div className="mt-4 space-y-4">
                {visibleTasks.map((task) => (
                    <div
                        key={task.id}
                        className="p-4 border rounded shadow bg-white space-y-2"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-blue-800">
                                    {task.title}
                                </h3>
                                <p className="text-sm text-gray-700">{task.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Assigned To: <b>{task.assignedTo}</b>
                                </p>
                                <p className="text-xs text-gray-500">
                                    Created By: <b>{task.createdBy}</b>
                                </p>
                                <p className="text-sm font-mono mt-1">
                                    ⏱ Time Spent:{' '}
                                    <span className="text-green-700 font-semibold">
                                        {formatTime(task.timeSpent || 0)}
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-col space-y-2 items-end">
                                {role === 'manager' ? (
                                    <>
                                        <select
                                            value={task.status}
                                            onChange={(e) =>
                                                handleStatusChange(task.id, e.target.value as TaskStatus)
                                            }
                                            className="text-sm border px-2 py-1 rounded"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="text-red-600 text-xs"
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : task.createdBy === userEmail ? (
                                    <>
                                        <div className="flex items-center space-x-2">
                                            <label
                                                htmlFor={`status-${task.id}`}
                                                className="text-xs text-gray-600"
                                            >
                                                Status:
                                            </label>
                                            <select
                                                id={`status-${task.id}`}
                                                value={task.status}
                                                onChange={(e) =>
                                                    handleStatusChange(task.id, e.target.value as TaskStatus)
                                                }
                                                className="text-xs border px-2 py-1 rounded"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => toggleTimer(task.id)}
                                                className={`text-xs px-2 py-1 rounded ${runningTaskId === task.id
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-green-600 text-white'
                                                    }`}
                                            >
                                                {runningTaskId === task.id ? 'Stop' : 'Start'}
                                            </button>
                                            <button
                                                onClick={() => onEdit(task)}
                                                className="text-green-600 text-xs"
                                            >
                                                ✏️ Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(task.id)}
                                                className="text-red-600 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-xs font-medium text-gray-700">
                                        Status: <span className="text-blue-600">{task.status}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}