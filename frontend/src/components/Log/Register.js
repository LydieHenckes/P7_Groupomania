import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { API_AUTH_SIGNUP } from '../../constants/api'
import PropTypes from 'prop-types';
import styles from './Log.module.css';

const Register = () => {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);

	const submit = async (e) => {
		e.preventDefault();

		await fetch(API_AUTH_SIGNUP, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
					firstname,
				 	lastname,
               email,
               password
            })
        });

		  setRedirect(true);

	};

	if (redirect) {
		return <Redirect to="/login"/>;
	}

	return (
		<div className= "form-signin">
			<form onSubmit = {submit}>
				<h1 className="h3 mb-3 fw-normal">S'inscrire</h1>
				<input type="lastname" className="form-control" placeholder="Nom" required 
					onChange = {e => setLastname(e.target.value)} />
				<input type="firstname" className="form-control" placeholder="Prénom" required 
					onChange = {e => setFirstname(e.target.value)} />
				<input type="email" className="form-control" placeholder="Adresse mail" required 
					onChange = {e => setEmail(e.target.value)}/>
				<input type="password" className="form-control" placeholder="Mot de passe" required 
					onChange = {e => setPassword(e.target.value)} />
				<button className="w-100 btn btn-lg btn-primary" type="submit">S'inscrire</button>
			</form>
		</div>
	)
}

Register.propTypes = {
	text: PropTypes.string
}

export default Register;