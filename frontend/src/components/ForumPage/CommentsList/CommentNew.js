import { useState } from 'react';
import PropTypes from 'prop-types';
import{ postApiObjet } from '../../../utils/network';
import { API_COMMENTS } from '../../../constants/api';

import styles from './CommentsList.module.css';

const CommentNew = ({postId, userId, userPhotourl, setIsCommentAdded}) => {
	const [commentNewContent, setCommentNewContent] = useState('');

	const handleSendNewComment = async (event) => {
		event.preventDefault();
		console.log('content envoyé: ', commentNewContent);

		// envoyer la requête post avec
		const body = {
			userId: userId,
			postId: postId,
			content: commentNewContent
		}
		const res = await postApiObjet(API_COMMENTS, body);
		if (res) {
			setCommentNewContent('');
			setIsCommentAdded(true);
		} else {

		};
	}

	const handleCange = (event) => {
		const content = event.target.value;
		setCommentNewContent(content);
	}

	return (
		<>
			<form onSubmit = {handleSendNewComment}>
				<div className = {styles.commentNew}>
					<div  className = {styles.comment__autorimg}>
						{userPhotourl 
							? <img src = {userPhotourl} alt = "Avatar de d'utilisateur" />
							: <i class="fas fa-user"></i>
						}
					</div>
					<label htmlFor='content'></label>
					<textarea className = {styles.commentNew__frame} name='content' placeholder="Votre commentaire..." onChange = {handleCange} value = {commentNewContent} >

					</textarea>
					<div className = {styles.commentNew__btn}>
						<button type="submit" title="Cliquez pour envoyer"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
					</div>
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