import { useState, useEffect } from 'react';
import { withErrorApi } from '../../hoc-helpers/withErrorApi';
import { API_USERS } from '../../constants/api';
import{ getApiResource } from '../../utils/network';
import { postApiObjetWithImage } from '../../utils/network';
import PropTypes from 'prop-types';
import styles from './ProfilPage.module.css';
//import cn from 'classnames';

const ProfilPage = ({setErrorApi, userId}) => {
	const [profil, setProfil] = useState(null);
	const [file, setFile] = useState('');

	const getProfil = async (url) => {
		const res = await getApiResource(url);
		if (res) {
			console.log(res);
			setProfil(res);
			setErrorApi(false);
		} else {
			setErrorApi(true);
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData();
		data.append('firstname', profil.firstname);
		data.append('lastname', profil.lastname);
		data.append('email', profil.email);
		if (file) data.append('image', file);


	}

	const handleChange = (event) => {
		let newProfil = profil;
		newProfil[event.target.name] = event.target.value;
		setProfil(newProfil);
   }
	

	useEffect(() => {
		getProfil(API_USERS+`/${userId}`);
	}, []) 


	return (
		<div className = {styles.wrapper}>
			{profil &&
			<form className = {styles.form} onSubmit = {handleSubmit}>
				<div className = {styles.formframe} >Profil</div>
				<div className = {styles.formframe}>
					<div className = {styles.file}>
						<div className = {styles.file__item}>
							<div className = {styles.file__addfile} aria-label ="Ajouter une image" role = "button" title = "Ajoutez une image">
								<label htmlFor="image" >
									<i className="far fa-image"></i> Changer la photo
								</label>
								<input 	id = "image" 
											accept = ".jpg, .png, .gif" 
											type = "file" 
											name = "image" 
											className ={styles.file__input} />
							</div>
						</div>
						<div className = {styles.file__preview}>

						</div>
					</div>
				</div>

				<div className = {styles.formframe}>
					<div className = {styles.formframe__item}>
						<label htmlFor = "formFirstname" className= {styles.formframe__label}>Nom</label>
						<input id = "formFirstname" type = "text" name = "firstname" defaultValue = {profil.firstname} 
								className = {styles.formframe__input} onChange = {handleChange} ></input>
					</div>
					<div className = {styles.formframe__item}>
						<label htmlFor = "formLastname" className= {styles.formframe__label}>Prénom</label>
						<input id = "formLastname" type = "text" name = "lastname" defaultValue = {profil.lastname} 
								className = {styles.formframe__input} onChange = {handleChange}></input>
					</div>
					<div className = {styles.formframe__item}>
						<label htmlFor = "formEmail" className= {styles.formframe__label}>Email</label>
						<input id = "formEmail" type = "email" name = "email" defaultValue = {profil.email} 
								className = {styles.formframe__input} onChange = {handleChange}></input>
					</div>
					
				</div>

				<div className = {styles.formframe}>
					<button className = {styles.form__button} type="submit" title="Enregister">Enregister</button>
				</div>
			</form>
			}
		</div>
	)
}

ProfilPage.propTypes = {
	setErrorApi: PropTypes.func,
	userId: PropTypes.number
}

export default withErrorApi(ProfilPage);