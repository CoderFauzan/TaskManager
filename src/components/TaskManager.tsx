import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Task } from '../features/tasks/taskSlice';

const TaskManager: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditMode(true);
    setCurrentTask(task);
  };

  const handleCloseForm = () => {
    setEditMode(false);
    setCurrentTask(null);
  };

  return (
    <div className="task-manager">
      <TaskList onEdit={handleEditTask} />
      <button
        onClick={() => setEditMode(true)}
        className="bg-green-500 text-white py-1 px-4 rounded mt-4"
      >
        Add New Task
      </button>

      {editMode && (
        <TaskForm currentTask={currentTask} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default TaskManager;
