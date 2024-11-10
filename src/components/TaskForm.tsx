import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask, Task } from '../features/tasks/taskSlice';
import { AppDispatch } from '../app/store';

interface TaskFormProps {
  currentTask: Task | null;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ currentTask, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, [currentTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTask) {
      dispatch(editTask({ id: currentTask.id, title, description }));
    } else {
      dispatch(addTask({ title, description }));
    }
    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded mt-4">
      <h3 className="font-semibold">{currentTask ? 'Edit Task' : 'Add Task'}</h3>
      <label className="block mt-2">
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </label>
      <label className="block mt-2">
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </label>
      <button type="submit" className="mt-4 bg-blue-500 text-white py-1 px-4 rounded">
        {currentTask ? 'Save Changes' : 'Add Task'}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="mt-4 bg-gray-300 text-black py-1 px-4 rounded ml-2"
      >
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
