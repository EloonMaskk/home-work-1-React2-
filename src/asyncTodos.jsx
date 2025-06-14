import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	addUser,
	deleteUser,
	editUser,
	getUsers,
	setAddName,
	setEditName,
	setIdx,
} from './features/todos/async-todosSlice'
import { Button, Checkbox, Input, Modal, Space, Table } from 'antd'

export default function AsyncTodo() {
	const { data } = useSelector(store => store.asyncTodo)
	const { editName } = useSelector(store => store.asyncTodo)
	const { idx } = useSelector(store => store.asyncTodo)
	const { addName } = useSelector(store => store.asyncTodo)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUsers())
	}, [])

	// ! Modal States
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [addModal, setAddModal] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	// ! edit
	function handleEdit(user) {
		setIsModalOpen(true)
		dispatch(setIdx(user.id))
		dispatch(setEditName(user.name))
	}

	function editFunc() {
		let editedUser = {
			id: idx,
			name: editName,
		}

		dispatch(editUser(editedUser))
		setIsModalOpen(false)
	}

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'id',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			render: (_, record) => (
				<Space>
					<Button danger onClick={() => dispatch(deleteUser(record.id))}>
						Delete
					</Button>
					<Button onClick={() => handleEdit(record)}>Edit</Button>
				</Space>
			),
		},
	]

	// ! add

	function handleAdd() {
		setAddModal(true)
	}

	function addFunc() {
		let newUser = {
			name: addName,
		}

		dispatch(addUser(newUser))
		dispatch(setAddName(''))

		setAddModal(false)
	}

	return (
		<>
			<h1>Async To DO</h1>
			<Button type='primary' onClick={handleAdd}>
				Add New +
			</Button>
			<Table
				dataSource={data.map(el => ({ ...el, key: el.id }))}
				columns={columns}
			/>

			{/* //! Edit Modal */}
			{isModalOpen && (
				<Modal
					title='Basic Modal'
					closable={{ 'aria-label': 'Custom Close Button' }}
					open={isModalOpen}
					onOk={editFunc}
					onCancel={handleCancel}
				>
					<Input
						placeholder='Edit Name...'
						value={editName}
						onChange={e => dispatch(setEditName(e.target.value))}
					/>
				</Modal>
			)}

			{addModal && (
				<Modal
					title='Add Modal'
					closable={{ 'aria-label': 'Custom Close Button' }}
					open={addModal}
					onOk={addFunc}
					onCancel={() => setAddModal(false)}
				>
					<Input
						placeholder='Add Name...'
						value={addName}
						onChange={e => {
							dispatch(setAddName(e.target.value))
						}}
					/>
				</Modal>
			)}
		</>
	)
}
