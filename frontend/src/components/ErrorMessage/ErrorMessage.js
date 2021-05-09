import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
	return (
		<>
			<p className = {styles.text}>
				Une erreur est survenue, <br />
				Réessayez plus tard. 
			</p>
		</>
	)
}

export default ErrorMessage;