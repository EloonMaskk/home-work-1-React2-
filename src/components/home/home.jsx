import { Button } from 'antd'
import { Link } from 'react-router'

export default function Header() {
	return (
		<>
			<ul
				style={{
					listStyle: 'none',
					display: 'flex',
					gap: '20px',
					fontSize: '20px',
				}}
			>
				<li>
					<Button style={{ fontSize: '20px' , fontWeight:'bold' }}>
						<Link to={'/asynctodo'}>Aync Todo</Link>
					</Button>
				</li>
				<li>
					<Button style={{ fontSize: '20px' , fontWeight:'bold'  }}>
						<Link to={'/synctodo'}>Sync Todo</Link>
					</Button>
				</li>
			</ul>
		</>
	)
}
