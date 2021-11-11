import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { API_AUTH_SIGNUP } from '../../constants/api'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

//import styles from './Log.module.css';

const Register = ({isAdmin}) => {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const isAdminValue = isAdmin;
			console.log('is Admin: ', isAdmin);
			const res = await fetch(API_AUTH_SIGNUP, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
					firstname,
				 	lastname,
               email,
               password,
					isAdmin: isAdminValue
            })
        });
			const content = await res.json();

			if (res.ok) {
				setRedirect(true)
			}
			else 	{
				const messageError = res.status + ' : '+content.error;
				console.error('Could not fetch. ', messageError);
				alert('Mot de passe est incorrect ! ', content.error);
			}
		}
		catch(error) {
			console.error('Could not fetch. ', error.message);
			setError(true);
		}
		finally {
			setLoading(false);
		}
	};


	if (redirect) {
		return <Redirect to="/login"/>;
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
					<form onSubmit = {submit}>
						<h1 className="h3 mb-3 fw-normal">Inscrivez-vous</h1>
		
						<input type="lastname" className="form-control" placeholder="Nom" required 
							onChange = {e => setLastname(e.target.value)} />
						<input type="firstname" className="form-control" placeholder="Prénom" required 
							onChange = {e => setFirstname(e.target.value)} />
						<input type="email" className="form-control" placeholder="Adresse mail" required 
							onChange = {e => setEmail(e.target.value)}/>
		
						<input type="password" className="form-control" 
								id = "inputPassword"
								placeholder="Mot de passe" required 
								onChange = {e => setPassword(e.target.value)} />
						<small id="emailHelp" class="form-text text-muted">Mot de passe (min 8 charactères, min 1 lettre majuscule, 1 lettre minuscule, 1 chiffre)</small>
						<br />
						<button className="w-100 btn btn-lg btn-primary" type="submit">S'inscrire</button>
					</form>
				</div>
			}
				 </div>
			 )}
		</>
	)
}

export default Register;