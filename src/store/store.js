import { configureStore } from '@reduxjs/toolkit'
import todolistReducer from '../features/todos/todolistSlice'
import asyncTodoSlice from '../features/todos/async-todosSlice'

export const store = configureStore({
	reducer: {
		todos: todolistReducer,
		asyncTodo: asyncTodoSlice,
	},
})
