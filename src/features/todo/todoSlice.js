import { nanoid, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/List";

// Fetch all todos
export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/todos');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create new todo
export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (text, { rejectWithValue }) => {
    try {
      const response = await api.post('/todos', {
        id: nanoid(),
        text: text,
        status: false
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete todo
export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update todo status
export const updateTodo = createAsyncThunk(
  'todo/updateTodo',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/todos/${id}`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  todos: [],
  filter: 'all',
  loading: false,
  error: null
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create todo
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilter } = todoSlice.actions;
export default todoSlice.reducer;