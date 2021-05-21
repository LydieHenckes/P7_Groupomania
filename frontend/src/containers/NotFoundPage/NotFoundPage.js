import { useLocation } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
	let location = useLocation();

	return (
		<>
			<p className = {styles.text}>La page {location.pathname} que vous cherchez n'existe pas!</p>
		</>
	)
}

export default NotFoundPage;