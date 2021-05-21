import LogIn from '../../components/Log/LogIn';
import styles from './LogInPage.module.css';


const LogInPage = ({firstname, setFirstname, setLastname}) => {
	return (
		<>
			<LogIn firstname = {firstname} setFirstname = {setFirstname} setLastname = {setLastname}/>
		</>
	)
}

export default LogInPage;