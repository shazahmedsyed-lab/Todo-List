import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, updateTodo, setFilter } from '../features/todo/todoSlice'

const Todo = () => {
  const todos = useSelector(state => state.todo.todos);
  const filter = useSelector(state => state.todo.filter);
  const loading = useSelector(state => state.todo.loading);
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = (id, currentStatus) => {
    dispatch(updateTodo({ id, status: !currentStatus }));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.status;
    if (filter === 'incomplete') return !todo.status;
    return true;
  });

  return (
    <div>
      <div>Your Todos</div>

      <select onChange={handleFilter} value={filter}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => handleToggle(todo.id, todo.status)}
              disabled={loading}
            />
            <span style={{
              textDecoration: todo.status ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button 
              onClick={() => handleDelete(todo.id)}
              disabled={loading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && 
        <p style={{ textAlign: 'center', color: '#999' }}>No todos yet. Add one above!</p>
      }
    </div>
  );
};

export default Todo;