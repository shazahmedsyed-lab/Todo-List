import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTodo } from '../features/todo/todoSlice'

const AddTodo = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector(state => state.todo.loading);
    const error = useSelector(state => state.todo.error);

    const addTodoHandler = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            await dispatch(createTodo(input));
            setInput('');
        }
    }
    
    return (
        <form onSubmit={addTodoHandler}>
            <input 
                className='input'
                placeholder='Enter a new todo...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
            />
            <button disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
            </button>
            {error && <p style={{ color: 'red' }}>{typeof error === 'string' ? error : error.message || 'Error adding todo'}</p>}
        </form>
    )
}

export default AddTodo
