import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { withErrorApi } from '../../hoc-helpers/withErrorApi';
import { API_USERS, API_AUTH_LOGOUT } from '../../constants/api';
import{ getApiResource } from '../../utils/network';
import {putApiObjetWithImage, deleteApiObjet } from '../../utils/network';
import ImageProfilCropper from '../../components/ImageCropper/ImageProfilCropper';
import demoAvatar from '../../assets/avatar.png';
import PropTypes from 'prop-types';
import styles from './ProfilPage.module.css';

const ProfilPage = ({setErrorApi, userId, setFirstname, setLastname, setUserId, setIsProfilChanged}) => {
	const [profil, setProfil] = useState(null);
	const [file, setFile] = useState('');
	const [newFile, setNewFile] = useState(undefined);

	const [redirect, setRedirect] = useState(false);
	const [redirectToLogIn, setRedirectToLogIn] = useState(false);
	const [isModifyAvatar, setIsModifyAvatar] = useState(false);
	const [newImage, setNewImage] = useState(undefined);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData();
		data.append('firstname', profil.firstname);
		data.append('lastname', profil.lastname);
		data.append('email', profil.email);
		if (file) data.append('image', file);

		const res = await putApiObjetWithImage(API_USERS+`/${userId}`, data);
			if (res) {
				alert('Les changements ont été enrégistré avec succès !');
				setRedirect(true);
				setIsProfilChanged(true);
			} else {
				alert("Les changements n'ont pas été enrégistré !");
				setRedirect(true);
			};
	}

	const handleChange = (event) => {
		let newProfil = profil;
		newProfil[event.target.name] = event.target.value;
		setProfil(newProfil);
   }
	
	const onChangeAvatar = () => {
		setIsModifyAvatar(true);
	}

	const onKeyDownChangeAvatar =(event) => {
		if(event.keyCode === 32 || event.keyCode === 13){
			event.preventDefault();
			setIsModifyAvatar(true);
		 }
	}

	const onDeleteProfil   = async () => {
		const result = window.confirm('Vous voulez supprimer votre compte définitivement ?');
		if (!result) return;

		const res = await deleteApiObjet(API_USERS+`/${userId}`);
			if (res) {
				alert('Le compte a été supprimé avec succès !');
				setRedirectToLogIn(true);
				setIsProfilChanged(true);
	
				const logout = await fetch(API_AUTH_LOGOUT, {
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						credentials: 'include',
				});
				if (logout.ok) {
					setFirstname('');
					setLastname('');
					setUserId('');		
				}

			} else {
				alert("Une erreur est survenu, le compte n'a pas été supprimé !");
				setRedirect(true);
			};
	}

	useEffect(() => {
		async function getProfil(url) {

			try {
				const res = await getApiResource(url);
				if (res) {

					setErrorApi(false);
					setProfil(res);
			
					if (newImage && newFile) {
						setFile(newFile);
						return;
					}
					if (res.photourl) {setFile(res.photourl)}; 
				} else {
					setErrorApi(true);
				}
			} catch(err) {
				console.log(err);
				setErrorApi(true);
			} finally {

			}
		}
		getProfil(API_USERS+`/${userId}`);
	}, [file, newFile, newImage, setErrorApi, userId]) 

	if (redirect) {
		return <Redirect to="/"/>;
	}
	if (redirectToLogIn) {
		return <Redirect to="/register"/>;
	}

 
	return (
		<div className = {styles.wrapper}>
			{!isModifyAvatar && profil && (
				<div>
					<form className = {styles.form} onSubmit = {handleSubmit}>
						<div className = {styles.formframe} >Profil</div>
						<div className = {styles.formframe}>
							
							<div className = {styles.file}>
								{file && !newImage
									? <img src = {file} alt = {`Avatar de  ${profil.firstname} ${profil.lastname}`} />
									: <img src = {demoAvatar} alt = {`Avatar demo`} />
								}
								{newImage &&
									<img src = {newImage} alt = {`Avatar de  ${profil.firstname} ${profil.lastname}`} />
								
								}
							</div>
							<div className = {styles.file__btn} onClick = {onChangeAvatar} aria-label ="Changer la photo" role = "button" 
									tabindex="0" onKeyDown = {onKeyDownChangeAvatar}	title = "Changer la photo">Changer la photo</div>
						</div>

						<div className = {styles.formframe} >
							<div className = {styles.formframe__item}>
								<label htmlFor = "formFirstname" className= {styles.formframe__label}>Prénom</label>
								<input id = "formFirstname" type = "text" name = "firstname" defaultValue = {profil.firstname} 
										className = {styles.formframe__input} onChange = {handleChange} ></input>
							</div>
							<div className = {styles.formframe__item}>
								<label htmlFor = "formLastname" className= {styles.formframe__label}>Nom</label>
								<input id = "formLastname"   type = "text" name = "lastname" defaultValue = {profil.lastname} 
										className = {styles.formframe__input} onChange = {handleChange}></input>
							</div>
							<div className = {styles.formframe__item}>
								<label htmlFor = "formEmail" className= {styles.formframe__label}>Email</label>
								<input id = "formEmail"    type = "email" name = "email" defaultValue = {profil.email} 
										className = {styles.formframe__input} onChange = {handleChange}></input>
							</div>
							
						</div>

						<div className = {styles.formframe}>
							<button className = {styles.form__button}   type="submit" title="Enregister">Enregister</button>
						</div>

						<div  className = {styles.formframe}>
							<button className = {styles.form__button}   onClick = {onDeleteProfil} aria-label ="Supprimer le profil" title = "Supprimer le profil">Supprimer profil</button>
						</div>
					</form>
				</div>
			)}

			{isModifyAvatar && 
				<div>
					<ImageProfilCropper setFile = {setFile} setNewImage = {setNewImage} setIsModifyAvatar = {setIsModifyAvatar} setNewFile = {setNewFile} />
				</div>

			}
		</div>
	)
}

ProfilPage.propTypes = {
	setErrorApi: PropTypes.func,
	userId: PropTypes.number,
	setFirstname: PropTypes.func, 
	setLastname: PropTypes.func, 
	setUserId: PropTypes.func,
	setIsProfilChanged: PropTypes.func
}

export default withErrorApi(ProfilPage);