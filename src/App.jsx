import { Button, Input, InputNumber, Modal, Space, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
	addFunc,
	delFunc,
	editFunc,
	setAddAge,
	setAddDescription,
	setAddName,
	setEditAge,
	setEditDescription,
	setEditName,
	setIdx,
} from './features/todos/todolistSlice'
import { useState } from 'react'

export default function App() {
	const data = useSelector(state => state.todos.data)
	const addName = useSelector(state => state.todos.addName)
	const addAge = useSelector(state => state.todos.addAge)
	const addDescription = useSelector(state => state.todos.description)

	const editName = useSelector(state => state.todos.editName)
	const editAge = useSelector(state => state.todos.editAge)
	const editDescription = useSelector(state => state.todos.editDescription)

	const dispatch = useDispatch()

	function handleDelete(user) {
		dispatch(delFunc(user.id))
	}
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Status',
			render: status => (status === 'true' ? 'Active' : 'Inactive'),
			key: 'status',
		},
		{
			title: 'Actions',
			render: (_, record) => (
				<Space>
					<Button type='primary' danger onClick={() => handleDelete(record)}>
						DELETE
					</Button>
					<Button type='default' onClick={() => handleEdit(record)}>
						Edit
					</Button>
				</Space>
			),
		},
	]

	// ? add Modal State
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editModal, setEditModal] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		dispatch(addFunc())
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setEditModal(false)
	}

	// ! edit
	function handleEdit(user) {
		setEditModal(true)

		dispatch(setEditName(user.name))
		dispatch(setEditAge(user.age))
		dispatch(setEditDescription(user.description))
		dispatch(setIdx(user.id))
	}

	function edit() {
		dispatch(editFunc())
		setEditModal(false)
	}

	// ! vremenniy
	const onChange = value => {
		console.log('changed', value)
	}
	return (
		<>
			<Button type='primary' onClick={showModal}>
				Add New +
			</Button>
			<Table columns={columns} dataSource={data}></Table>

			{/* //! add Modal */}
			{isModalOpen && (
				<Modal
					title='Add Modal'
					closable={{ 'aria-label': 'Custom Close Button' }}
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					className='modal'
				>
					<Space
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'start',
							gap: '20px',
						}}
					>
						<Input
							placeholder='put name...'
							style={{ width: '300px' }}
							value={addName}
							onChange={e => dispatch(setAddName(e.target.value))}
						/>
						<InputNumber
							placeholder='age...'
							style={{ width: '200px' }}
							onChange={value => dispatch(setAddAge(value))}
						/>
						<Input
							placeholder='put description...'
							style={{ width: '300px' }}
							value={addDescription}
							onChange={e => dispatch(setAddDescription(e.target.value))}
						/>
					</Space>
				</Modal>
			)}

			{/* //! edit Modal */}
			{editModal && (
				<Modal
					title='Edit Modal'
					closable={{ 'aria-label': 'Custom Close Button' }}
					open={editModal}
					onOk={edit}
					onCancel={handleCancel}
					className='modal'
				>
					<Space
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'start',
							gap: '20px',
						}}
					>
						<Input
							placeholder='put name...'
							style={{ width: '300px' }}
							value={editName}
							onChange={e => dispatch(setEditName(e.target.value))}
						/>
						<InputNumber
							placeholder='age...'
							style={{ width: '200px' }}
							value={editAge}
							onChange={value => dispatch(setEditAge(value))}
						/>
						<Input
							placeholder='put description...'
							style={{ width: '300px' }}
							value={editDescription}
							onChange={e => dispatch(setEditDescription(e.target.value))}
						/>
					</Space>
				</Modal>
			)}
		</>
	)
}
