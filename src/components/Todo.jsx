import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removetodo, edittodo, setFilter } from '../features/todo/todoSlice'

const Todo = () => {
  const todos = useSelector(state => state.todo.todos);
  const filter = useSelector(state => state.todo.filter);
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.status;
    if (filter === "incomplete") return !todo.status;
    return true;
  });

  return (
    <div>
      Todos

      <select onChange={handleFilter}>
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
              onChange={() => dispatch(edittodo(todo.id))}
            />
            <span style={{
              textDecoration: todo.status ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(removetodo(todo.id))}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;