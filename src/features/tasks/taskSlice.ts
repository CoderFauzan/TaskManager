import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Pick<Task, 'title' | 'description'>>) => {
      const newTask = {
        ...action.payload,
        id: Date.now().toString(),
        completed: false,
      };
      state.tasks.push(newTask);
    },
    editTask: (state, action: PayloadAction<{ id: string; title: string; description: string }>) => {
      const { id, title, description } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
