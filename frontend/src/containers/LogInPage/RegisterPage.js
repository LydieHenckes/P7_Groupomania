import Register from '../../components/Log/Register';
import PropTypes from 'prop-types';

const RegisterPage = ({isAdmin}) => {
	return (
		<>
			<Register isAdmin = {isAdmin} />
		</>
	)
}

RegisterPage.propTypes = {
	isAdmin: PropTypes.bool,

}

export default RegisterPage;