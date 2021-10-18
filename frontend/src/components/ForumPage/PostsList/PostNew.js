import { useState } from 'react';
import PropTypes from 'prop-types';
import { postApiObjetWithImage } from '../../../utils/network';
import { API_POSTS } from '../../../constants/api';

import styles from './PostsList.module.css';

const PostNew = ({userId, userPhotourl, setIsPostAdded}) => {
	const [postNewContent, setPostNewContent] = useState('');
	const [file, setFile] = useState('');

	const handleSendNewPost = async (event) => {
		event.preventDefault();
	
		// envoyer la requête post avec
		if (postNewContent !=='') {
// ----------------
			const data = new FormData();
			data.append('userId', userId);
			data.append('content', postNewContent);
			if (file) data.append('image', file);

			const res = await postApiObjetWithImage(API_POSTS, data);
			if (res) {
				setPostNewContent('');
				setIsPostAdded(true);
				setFile('');
			};

		} else {alert('Message est vide!')}
	}

	const handleCange = (event) => {
		setPostNewContent(event.target.value);
	}

	const handlePicture = (event) => {
		setFile(event.target.files[0]);
	}


	return (
		<div className = {styles.posts__container}>
			<form className = {styles.item} onSubmit = {handleSendNewPost}>
				<div className = {styles.postNew}>
					<div  className = {styles.post__autorimg}>
						{userPhotourl 
							? <img src = {userPhotourl} alt = "Avatar de d'utilisateur" />
							: <i className="fas fa-user"></i>
						}
					</div>
					<div className = {styles.postNew__addfile} aria-label ="Ajouter une image" role = "button" title = "Ajoutez une image">
						<label htmlFor="file-upload" className="custom-file-upload">
							<i className="far fa-image"></i>
						</label>
						<input id="file-upload" type="file"
							name="file"
							accept=".jpg, .jpeg, .png"
							onChange={event => handlePicture(event)}
						/>
					</div>

					<label htmlFor='content'></label>
					<textarea className = {styles.postNew__frame} name='content' placeholder="Ecrivez quelque chose..." onChange = {handleCange} value = {postNewContent} >

					</textarea>
					<div className = {styles.postNew__btn}>
						<button type="submit" title="Cliquez pour envoyer"><i className="fa fa-paper-plane-o" aria-hidden="true"></i> Envoyer </button>
					</div>
				</div>
				<div className= {styles.postNew__photourl} >
						{file && <div>{file.name}</div>}
				</div>
			</form>
		</div>
	)
}

PostNew.propTypes = {
	text: PropTypes.string
}

export default PostNew;