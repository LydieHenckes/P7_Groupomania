import LogIn from '../../components/Log/LogIn';
import PropTypes from 'prop-types';

const LogInPage = ({setFirstname, setLastname, setUserId, setUserPhotourl, setIsProfilChanged}) => {
	return (
		<>
			<LogIn  setFirstname = {setFirstname} setLastname = {setLastname} setUserId = {setUserId}  setUserPhotourl= {setUserPhotourl} setIsProfilChanged = {setIsProfilChanged} />
		</>
	)
}

LogInPage.propTypes = {
	setFirstname : PropTypes.func,
	setLastname: PropTypes.func, 
	setUserId: PropTypes.func, 
	setUserPhotourl: PropTypes.func, 
	setIsProfilChanged: PropTypes.func,

}

export default LogInPage;