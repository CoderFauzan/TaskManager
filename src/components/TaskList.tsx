import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Task, deleteTask, toggleTaskStatus } from '../features/tasks/taskSlice';
import { AppDispatch } from '../app/store';

interface TaskListProps {
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEdit }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleComplete = (id: string) => {
    dispatch(toggleTaskStatus(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task-item p-2 border-b border-gray-300">
          <h3 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <p>{task.description}</p>
          <div className="mt-2">
            <button
              className="text-green-500 hover:underline mr-4"
              onClick={() => handleToggleComplete(task.id)}
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button
              className="text-blue-500 hover:underline mr-4"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:underline"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
