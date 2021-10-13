import { useState } from 'react';
import PropTypes from 'prop-types';
import { postApiObjet, postApiObjetWithImage } from '../../../utils/network';
import { API_COMMENTS } from '../../../constants/api';

import styles from './CommentsList.module.css';

const CommentNew = ({postId, userId, userPhotourl, setIsCommentAdded}) => {
	const [commentNewContent, setCommentNewContent] = useState('');
	const [file, setFile] = useState('');
	

	const handleSendNewComment = async (event) => {
		event.preventDefault();
		console.log('content envoyé: ', commentNewContent);

		// envoyer la requête post avec
		if (commentNewContent !=='') {
// ----------------
			const data = new FormData();
			data.append('userId', userId);
			data.append('postId', postId);
			data.append('content', commentNewContent);
			if (file) data.append('image', file);

			const res = await postApiObjetWithImage(API_COMMENTS, data);
			if (res) {
				setCommentNewContent('');
				setIsCommentAdded(true);
				setFile('');
			};
//-----------------------
	/*		if (file) {
				const data = new FormData();
				data.append('userId', userId);
				data.append('postId', postId);
				data.append('content', commentNewContent);
				if (file) data.append('image', file);

				const res = await postApiObjetWithImage(API_COMMENTS, data);
				if (res) {
					setCommentNewContent('');
					setIsCommentAdded(true);
					setFile('');
				};

			} else {
				const body = {
					userId: userId,
					postId: postId,
					content: commentNewContent
				}

				const res = await postApiObjet(API_COMMENTS, body);
				if (res) {
					setCommentNewContent('');
					setIsCommentAdded(true);
					setFile('');
				};
			}
			*/
// ---------------------------

		} else {alert('Message est vide!')}
	}

	const handleCange = (event) => {
		setCommentNewContent(event.target.value);
	}

	const handlePicture = (event) => {

		setFile(event.target.files[0]);
	}

	// <i class="far fa-image"></i>
	return (
		<>
			<form onSubmit = {handleSendNewComment}>
				<div className = {styles.commentNew}>
					<div  className = {styles.comment__autorimg}>
						{userPhotourl 
							? <img src = {userPhotourl} alt = "Avatar de d'utilisateur" />
							: <i className="fas fa-user"></i>
						}
					</div>
					<div className = {styles.commentNew__addfile} aria-label ="Ajouter une image" role = "button" title = "Ajoutez une image">
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
					<textarea className = {styles.commentNew__frame} name='content' placeholder="Votre commentaire..." onChange = {handleCange} value = {commentNewContent} >

					</textarea>
					<div className = {styles.commentNew__btn}>
						<button type="submit" title="Cliquez pour envoyer"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
					</div>
				</div>
				<div className= {styles.commentNew__photourl} >
						{file && <div>{file.name}</div>}
				</div>
			</form>
		</>
	)
}

CommentNew.propTypes = {
	postId:  PropTypes.number, 
	userId: PropTypes.number,
	userPhotourl: PropTypes.string,
	setIsCommentAdded: PropTypes.func
}

export default CommentNew;