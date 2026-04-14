import { nanoid,createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos : [{id:1 , text :"Sleep",status : false}],
    filter : "all"
}

export const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers:{
    addTodo : (state,action)=> {
        const todos = {
        id : nanoid(),
        text : action.payload,
        status : false
        }
        state.todos.push(todos);
    },

    removetodo : (state,action)=>{
     state.todos = state.todos.filter((todo)=>todo.id!==action.payload);
    },

    edittodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        return todo.id === action.payload ? { ...todo, status: !todo.status } : todo;
      });
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { addTodo, removetodo, edittodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;