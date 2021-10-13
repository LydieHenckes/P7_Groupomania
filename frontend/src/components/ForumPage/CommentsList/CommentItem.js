import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import{ postApiObjet } from '../../../utils/network';
import { API_COMMENTLIKE, API_COMMENTDISLIKE } from '../../../constants/api';

import styles from './CommentsList.module.css';

const CommentItem = ({comment, userId}) => {
	const [commentlikeCount, setCommentlikeCount] = useState(null);
	const [commentdislikeCount, setCommentdislikeCount] = useState(null);

	const handleLikeComment = async () => {
		// envoyer la requête post avec
		const body = {
			userId: userId,
			commentId: comment.commentId
		}
		const res = await postApiObjet(API_COMMENTLIKE, body);
		if (res) {
		   setCommentlikeCount(res.commentlikeCount);
		   setCommentdislikeCount(res.commentdislikeCount);
		} else {

		};

	}

	const handleDislikeComment = async () => {
		// envoyer la requête post avec
		const body = {
			userId: userId,
			commentId: comment.commentId
		}
		const res = await postApiObjet(API_COMMENTDISLIKE, body);
		if (res) {
		   setCommentlikeCount(res.commentlikeCount);
		   setCommentdislikeCount(res.commentdislikeCount);
		} else {

		};
	}


	useEffect(() => {
		setCommentlikeCount(comment.commentlikeCount);
		setCommentdislikeCount(comment.commentdislikeCount);
	}, []);

	return (
		<>
			<div className = {styles.comment__frame}>
				<div className = {styles.comment__autorimg}>
					{comment.userPhotourl 
						? <img src = {comment.userPhotourl} alt = {`Photo de  ${comment.firstname} ${comment.lastname}`} />
						: <i className="fas fa-user"></i>
					}
				</div>
				<div className = {styles.comment__textframe}>
					<div className = {styles.comment__textframe__autorname}>
						{comment.firstname} {comment.lastname}
					</div>
					
					{comment.photourl && 
					<div className = {styles.comment__textframe__img}>
						<img src = {comment.photourl} alt = {`image de comment`} />
					</div>
					}
					<div  className = {styles.comment__textframe__content}>
						{comment.content}
					</div>
				</div>
				<div className = {styles.comment__likes}>
					<span onClick = {handleLikeComment}><i className="far fa-thumbs-up"></i>{` ${commentlikeCount}`}</span>
				</div>
				<div className = {styles.comment__dislikes}>
					<span onClick = {handleDislikeComment}><i className="far fa-thumbs-down"></i>{` ${commentdislikeCount}`}</span>
				</div>
			</div>
		</>
	)
}

CommentItem.propTypes = {
	comment: PropTypes.object,
	userId: PropTypes.number
	
}

export default CommentItem;