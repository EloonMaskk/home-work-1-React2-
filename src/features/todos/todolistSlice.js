import { createSlice } from '@reduxjs/toolkit'

export const todolistSlice = createSlice({
	name: 'todos',
	initialState: {
		data: [
			{
				key: 1,
				id: 1,
				name: 'Ronaldo',
				description: 'Football player',
				age: 20,
				status: 'true',
			},
			{
				key: 2,
				id: 2,
				name: 'Qrbon',
				description: 'Volleyball player',
				age: 22,
				status: 'false',
			},
			{
				key: 3,
				id: 3,
				name: 'Slton',
				description: 'Basketball player',
				age: 11,
				status: 'false',
			},
		],
		addName: '',
		addAge: '',
		addDescription: '',

		editName: '',
		editAge: '',
		editDescription: '',
		idx: null,
	},
	reducers: {
		delFunc: (state, action) => {
			state.data = state.data.filter(el => el.id != action.payload)
		},
		setAddName: (state, action) => {
			state.addName = action.payload
		},
		setAddAge: (state, action) => {
			state.addAge = action.payload
		},
		setAddDescription: (state, action) => {
			state.addDescription = action.payload
		},
		addFunc: (state, action) => {
			state.data.push({
				id: Date.now(),
				name: state.addName,
				age: state.addAge,
				description: state.addDescription,
				status: 'false',
			})
			;(state.addName = ''), (state.addAge = ''), (state.addDescription = '')
		},

		setEditName: (state, action) => {
			state.editName = action.payload
		},
		setEditAge: (state, action) => {
			state.editAge = action.payload
		},
		setEditDescription: (state, action) => {
			state.editDescription = action.payload
		},
		setIdx: (state, action) => {
			state.idx = action.payload
		},
		editFunc: state => {
			state.data = state.data.map(el =>
				el.id === state.idx
					? {
							...el,
							name: state.editName,
							age: state.editAge,
							description: state.editDescription,
					  }
					: el
			)
		},
		
	},
})

export default todolistSlice.reducer
export const {
	delFunc,
	setAddName,
	setAddAge,
	setAddDescription,
	addFunc,
	setEditName,
	setEditAge,
	setEditDescription,
	setIdx,
	editFunc,
} = todolistSlice.actions
