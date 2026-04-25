import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../../services/taskService';

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getTasks = createAsyncThunk(
  'tasks/getAll',
  async (projectId, thunkAPI) => {
    try {
      return await taskService.getTasks(projectId);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData, thunkAPI) => {
    try {
      return await taskService.createTask(taskData.projectId, taskData.task);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (taskData, thunkAPI) => {
    try {
      return await taskService.updateTask(taskData.id, taskData.data);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id, thunkAPI) => {
    try {
      return await taskService.deleteTask(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload.id
        );
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
