import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withErrorApi } from '../../hoc-helpers/withErrorApi';
import Loader from '../Loader/Loader';
import { API_AUTH_LOGIN } from '../../constants/api'


const LogIn = ({setErrorApi, setFirstname, setLastname, setUserId, setIsAdmin, setUserPhotourl, setIsProfilChanged }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	
	const handleLogIn = async (e)  => {
		e.preventDefault();
		setLoading(true);
		try {
			if (isMounted) {
				const res = await fetch(API_AUTH_LOGIN, {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					credentials: 'include',
					body: JSON.stringify({
						email,
						password
					})
				});
				if (res.ok) {
					const content = await res.json();
		
					setRedirect(true);	  
					setFirstname(content.firstName);
					setLastname(content.lastName);
					setUserId(content.userId);
					setIsAdmin(content.isAdmin);
					setUserPhotourl(content.photourl);
					setIsProfilChanged(false);

					setErrorApi(false);
				}
				 else {
					 setErrorApi(true);
				 };
			}
		}
		catch {
			setErrorApi(true);
		}
		finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setIsMounted(true);
		return () => {
			setIsMounted(false);
		}
	}, [])
	

	if (redirect) {
		return <Redirect to="/"/>;
	}

	return (
		<>
			{isLoading ? (
     			   <Loader />
 		   ) : (
					<div className= "form-signin">
						<form onSubmit = {handleLogIn}>
							<h1 className="h3 mb-3 fw-normal">Connectez-vous</h1>
							<input type="email" className="form-control" placeholder="Adresse mail"   required
								onChange = {e => setEmail(e.target.value)} />
							<input type="password" className="form-control" placeholder="Mot de passe" required
								onChange = {e => setPassword(e.target.value)} />
							<button className="w-100 btn btn-lg btn-primary mt-2" type="submit">Se connecter</button>
						</form>
					</div>
  		  )}
		</>
	)
}

LogIn.propTypes = {
	setErrorApi: PropTypes.func,
	setFirstname: PropTypes.func, 
	setLastname :PropTypes.func,
	setUserId :PropTypes.func,
	setIsAdmin: PropTypes.func,
	setUserPhotourl:PropTypes.func,
	setIsProfilChanged :PropTypes.func
}

export default withErrorApi(LogIn);