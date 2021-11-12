import React from 'react';
import { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { API_AUTH_SIGNUP } from '../../constants/api'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

import styles from './Log.module.css';

const Register = ({isAdmin}) => {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const firstnameInputRef = useRef(null);
	const lastnameInputRef = useRef(null);
	const emailInputRef  = useRef(null);
	const passwordInputRef = useRef(null);


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

	const handleKeyUpLastname = (e) => {
		if(lastnameInputRef.current.patternMismatch) {
			lastnameInputRef.current.setCustomValidity("Veuillez renseigner un nom valid...");
			lastnameInputRef.current.classList.add('_alert');
			// si la saisie ne correspond pas à pattern, ajout de classe _alert
		} else {
			lastnameInputRef.current.setCustomValidity("");
			lastnameInputRef.current.classList.remove('_alert');
		}
	}
	const handleKeyUpFirstname = (e) => {
	//	const styleAlert = {styles.alert}
		if(firstnameInputRef.current.validity.patternMismatch) {
			firstnameInputRef.current.setCustomValidity("Veuillez renseigner un prénom valid...");
			firstnameInputRef.current.classList.add('_alert');
			// si la saisie ne correspond pas à pattern, ajout de classe _alert
		} else {
			firstnameInputRef.current.setCustomValidity("");
			firstnameInputRef.current.classList.remove('_alert');
		}
	}

	const handleKeyUpEmail  = (e) => {
		if(emailInputRef.current.validity.patternMismatch) {
			emailInputRef.current.classList.add('_alert');
			// si la saisie ne correspond pas à pattern, ajout de classe _alert
		} else {
			emailInputRef.current.classList.remove('_alert');
		}
	}


	const handleKeyUpPassword  = (e) => {
			if(passwordInputRef.current.validity.patternMismatch) {
				passwordInputRef.current.setCustomValidity("min 8 charactères, min 1 lettre majuscule, 1 lettre minuscule, 1 chiffre!");
				passwordInputRef.current.classList.add('_alert');
				// si la saisie ne correspond pas à pattern, ajout de classe _alert
			} else {
				passwordInputRef.current.setCustomValidity("");
				passwordInputRef.current.classList.remove('_alert');
			}
	}

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
		
						<input type="lastname" className="form-control" name="lastName" id="inputLastName" ref = {lastnameInputRef}
							placeholder="Nom" onKeyUp={handleKeyUpLastname} pattern="[a-zA-ZÀ-ÿ-\s]+" required 
							onChange = {e => setLastname(e.target.value)} />

						<input type="firstname" className="form-control" name="firstName" id="inputFirstName" ref = {firstnameInputRef}
							placeholder="Prénom" onKeyUp={handleKeyUpFirstname} pattern="[a-zA-ZÀ-ÿ-\s]+" required 
							onChange = {e => setFirstname(e.target.value)} />

						<input type="email" className="form-control" name="email" id="inputEmail" 
							placeholder="Adresse mail" ref = {emailInputRef} onKeyUp = {handleKeyUpEmail}
							pattern="[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required 
							onChange = {e => setEmail(e.target.value)}/>
		
						<input type="password" className="form-control" 
								id = "inputPassword"  name="password" ref = {passwordInputRef} onKeyUp={handleKeyUpPassword}
								placeholder="Mot de passe" pattern = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}" required 
								onChange = {e => setPassword(e.target.value)} />
						<small id="emailHelp" className="form-text text-muted ">min 8 charactères, min 1 lettre majuscule, 1 lettre minuscule, 1 chiffre</small>
						 
						<button className="w-100 btn btn-lg btn-primary mt-3" type="submit">S'inscrire</button>
					</form>
				</div>
			}
				 </div>
			 )}
		</>
	)
}

export default Register;