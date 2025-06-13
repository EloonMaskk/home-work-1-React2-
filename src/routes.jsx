import { BrowserRouter, Route, Routes } from 'react-router'
import AsyncTodo from './asyncTodos'
import App from './App'
import Header from './components/home/home'

export default function Router() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='asynctodo' element={<AsyncTodo />} />
					<Route path='synctodo' element={<App />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
