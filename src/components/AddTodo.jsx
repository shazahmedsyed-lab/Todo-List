import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'

const AddTodo = () => {
    const [input,setInput] = useState('');
    const  dispatch = useDispatch();

    const addTodoHandler = (e)=>{
        e.preventDefault();
        dispatch(addTodo(input))
        setInput('')
    }
    
  return (
   <form onSubmit={addTodoHandler}>
    <input className='input'
            placeholder='Enter here'
            value={input}
            onChange={(e)=>setInput(e.target.value)}></input>
    <button>Submit</button>
   </form>
  )
}

export default AddTodo
