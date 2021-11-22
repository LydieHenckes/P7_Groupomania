import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { API_AUTH_LOGOUT } from '../../constants/api'
import  logo  from '../../assets/logo-gpm-red.png'

//import  logo  from '../../assets/logo-header-blue.png'
import styles from './Header.module.css';

const Header = ({ firstname, setFirstname, setLastname, setUserId, setIsAdmin }) => {
	const logout = async () => {
		await fetch(API_AUTH_LOGOUT, {
			 method: 'POST',
			 headers: {'Content-Type': 'application/json'},
			 credentials: 'include',
		});

		setFirstname('');
		setLastname('');
		setUserId(null);
		setIsAdmin(false);

  };

	let menu;

	if ((firstname === '')||(!firstname)) {
		menu = (
			<ul className = {styles.menu}>
				<li><NavLink to="/login" exact >Se connecter</NavLink></li>
				<li><NavLink to="/register" exact >S'inscrire</NavLink></li>
			</ul>
		) 
	} else {
		// ajouter le contrôle si l'utilisateur est un admin
		
		menu = (
			<ul className = {styles.menu}>
				<li><NavLink to="/" exact ><i className="far fa-comments"></i> Forum</NavLink></li>
				<li><NavLink to="/users" exact ><i className="fas fa-users"></i> Team</NavLink></li>
				<li><NavLink to="/profil" exact ><i className="fas fa-user-cog"></i> Profil</NavLink></li>
				<li><NavLink to="/login" exact onClick={logout}><i className="fas fa-power-off"></i> Se déconnecter</NavLink></li>
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
	setLastname :PropTypes.func,
	setIsAdmin :PropTypes.func
}


export default Header;