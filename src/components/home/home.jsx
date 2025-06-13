import { Link } from 'react-router'

export default function Header() {
	return (
		<>
			<ul>
				<li>
					<Link to={'/asynctodo'}>Aync Todo</Link>
				</li>
				<li>
					<Link to={'/synctodo'}>Sync Todo</Link>
				</li>
			</ul>
		</>
	)
}
