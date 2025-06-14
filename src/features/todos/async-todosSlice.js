import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { act } from 'react'

export const getUsers = createAsyncThunk(
	'asyncTodoSlice/getUsers',
	async () => {
		try {
			let { data } = await axios.get(
				'https://to-dos-api.softclub.tj/api/categories'
			)
			return data.data
		} catch (error) {
			console.log(error)
		}
	}
)

export const deleteUser = createAsyncThunk(
	'asyncTodoSlice/deleteUser',
	async (id, { dispatch }) => {
		try {
			await axios.delete(
				`https://to-dos-api.softclub.tj/api/categories?id=${id}`
			)
			dispatch(getUsers())
		} catch (error) {
			console.error(error)
		}
	}
)

export const editUser = createAsyncThunk(
	'asyncTodoSlice/editUser',
	async (editedUser, { dispatch }) => {
		try {
			await axios.put(
				'https://to-dos-api.softclub.tj/api/categories',
				editedUser
			)
			dispatch(getUsers())
		} catch (error) {
			console.error(error)
		}
	}
)

export const addUser = createAsyncThunk(
	'asyncTodoSlice/addUser',
	async (newUser, { dispatch }) => {
		try {
			let { data } = await axios.post(
				'https://to-dos-api.softclub.tj/api/categories',
				newUser
			)
			dispatch(getUsers(data))
			setAddName('')
		} catch (error) {
			console.error(error)
		}
	}
)

export const asyncTodoSlice = createSlice({
	name: 'asyncTodo',
	initialState: {
		data: [],
		editName: '',
		idx: null,
		addName: '',
	},
	reducers: {
		setEditName: (state, action) => {
			state.editName = action.payload
		},
		setIdx: (state, action) => {
			state.idx = action.payload
		},
		setAddName: (state, action) => {
			state.addName = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.data = action.payload
		})
	},
})

export default asyncTodoSlice.reducer

export const { setEditName, setIdx, setAddName } = asyncTodoSlice.actions
