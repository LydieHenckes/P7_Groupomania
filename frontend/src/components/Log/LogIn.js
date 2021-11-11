import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { API_AUTH_LOGIN } from '../../constants/api'


const LogIn = ({setFirstname, setLastname, setUserId, setUserPhotourl, setIsProfilChanged }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);
	const [isLoading, setLoading] = useState(false);
	
	const handleLogIn = async (e)  => {
		e.preventDefault();
		setLoading(true);
		try {
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
				console.log('content in log', content);
				setRedirect(true);	  
				setFirstname(content.firstName);
				setLastname(content.lastName);
				setUserId(content.userId);
				setUserPhotourl(content.photourl);
				setIsProfilChanged(false);
			}
			 else {
				 setError(true);
			 };
		}
		catch {
			setError(true);
		}
		finally {
			setLoading(false);
		}
	};
/*
	useEffect(() => {
		
		return () => {
			//cleanup
		}
	}, [])

	*/

	if (redirect) {
		return <Redirect to="/"/>;
	}

	return (
		<>
			{isLoading ? (
     			   <Loader />
 		   ) : (
				<div>
					{error && <ErrorMessage />}
					{!error &&
						<div className= "form-signin">
							<form onSubmit = {handleLogIn}>
								<h1 className="h3 mb-3 fw-normal">Connectez-vous</h1>
								<input type="email" className="form-control" placeholder="Adresse mail" required
									onChange = {e => setEmail(e.target.value)} />
								<input type="password" className="form-control" placeholder="Mot de passe" required
									onChange = {e => setPassword(e.target.value)} />
								<button className="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>
							</form>
						</div>
				}
				</div>
  		  )}
		</>
	)
}

LogIn.propTypes = {

	setFirstname: PropTypes.func, 
	setLastname :PropTypes.func,
	setUserId :PropTypes.func,
	setUserPhotourl:PropTypes.func,
	setIsProfilChanged :PropTypes.func
}

export default LogIn;