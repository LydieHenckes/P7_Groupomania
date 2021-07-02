import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { API_AUTH_LOGOUT } from '../../constants/api'
import  logo  from '../../assets/logo-header-blue.png'
import styles from './Header.module.css';

const Header = ({ firstname, setFirstname, setLastname }) => {
	const logout = async () => {
		await fetch(API_AUTH_LOGOUT, {
			 method: 'POST',
			 headers: {'Content-Type': 'application/json'},
			 credentials: 'include',
		});

		setFirstname('');
		setLastname('');
  };

	let menu;
	if (firstname === '') {
		menu = (
			<ul className = {styles.menu}>
				<li><Link to="/login" exact>Se connecter</Link></li>
				<li><Link to="/register" exact>S'inscrire</Link></li>
			</ul>
		) 
	} else {
		// ajouter le contrôle si l'utilisateur est un admin
		
		// <i class="fas fa-user-cog"></i>
		menu = (
			<ul className = {styles.menu}>
				<li><Link to="/" exact><i class="far fa-comments"></i> Forum</Link></li>
				<li><Link to="/users" exact><i class="fas fa-users"></i> Team</Link></li>
				<li><Link to="/users" exact><i class="fas fa-user-cog"></i> Profil</Link></li>
				<li><Link to="/login" exact onClick={logout}><i class="fas fa-power-off"></i> Se déconnecter</Link></li>
			</ul>
		)
	}

	return (
		<div className = {styles.headerContainer}>
			<img src={logo} alt='logo groupomania' />
			{menu}
		</div>
	)
}

Header.propTypes = {
	firstname: PropTypes.string,
	lastname: PropTypes.string,
	setFirstname: PropTypes.func, 
	setLastname :PropTypes.func
}


export default Header;