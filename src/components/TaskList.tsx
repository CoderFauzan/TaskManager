import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { deleteTask, toggleTaskStatus } from '../features/tasks/taskSlice';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="flex justify-between p-4 border-b">
          <div>
            <h2 className={task.completed ? 'line-through' : ''}>{task.title}</h2>
            <p>{task.description}</p>
          </div>
          <div>
            <button
              onClick={() => dispatch(toggleTaskStatus(task.id))}
              className="text-green-500"
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="text-red-500 ml-2"
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
