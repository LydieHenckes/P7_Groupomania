import LogIn from '../../components/Log/LogIn';
import PropTypes from 'prop-types';

const LogInPage = ({setFirstname, setLastname, setUserId, setIsAdmin, setUserPhotourl, setIsProfilChanged}) => {
	return (
		<>
			<LogIn  setFirstname = {setFirstname} setLastname = {setLastname} setUserId = {setUserId} setIsAdmin= {setIsAdmin} setUserPhotourl= {setUserPhotourl} setIsProfilChanged = {setIsProfilChanged} />
		</>
	)
}

LogInPage.propTypes = {
	setFirstname : PropTypes.func,
	setLastname: PropTypes.func, 
	setUserId: PropTypes.func, 
	setUserPhotourl: PropTypes.func, 
	setIsProfilChanged: PropTypes.func,
	setIsAdmin: PropTypes.func
}

export default LogInPage;