import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AddTodo from './components/AddTodo'
import Todo from './components/Todo'
import { fetchTodos } from './features/todo/todoSlice'
import './App.css'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
    <AddTodo/>
    <Todo/>
    </div>
  )
}

export default App
