import { configureStore } from '@reduxjs/toolkit'
import todolistReducer from '../features/todos/todolistSlice'

export const store = configureStore({
	reducer: {
		todos: todolistReducer,
	},
})
