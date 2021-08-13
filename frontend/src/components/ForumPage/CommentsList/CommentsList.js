import { useState, useEffect } from 'react';
import{ getApiResource } from '../../../utils/network'
import { API_COMMENTS } from '../../../constants/api'
import PropTypes from 'prop-types';
import styles from './CommentsList.module.css';

const CommentsList = ({postId}) => {
	const [comments, setComments] = useState([]);

	const getComments = async (url) => {
		const res = await getApiResource(url);
		if (res) {
			const commentsList = res.map(({commentId, content, commentIsDeleted, createdAt, userId,  lastname, firstname, email, userPhotourl, userIsDeleted, photourl, commentlikeCount, commentdislikeCount}) => {
				return {
					commentId,
					content,
					commentIsDeleted,
					createdAt,
					userId,
					lastname,
					firstname,
					email,
					userPhotourl,
					userIsDeleted,
					photourl,
					commentlikeCount,
					commentdislikeCount
				}
			})
			setComments(commentsList);
		
		} else {
		}
	}

	useEffect(() => {
		getComments(API_COMMENTS+`/${postId}`);
	}, []) //
/*
	if (!comments) {
		return false
	}*/
	return (
		
			
				<ul className = {styles.comments__container}>
					{comments.map((comment) => 
						<li className = {styles.comment} key = {comment.commentId}>
							<div className = {styles.comment__frame}>
								<div className = {styles.comment__autorimg}>
									{comment.userPhotourl 
										? <img src = {comment.userPhotourl} alt = {`Photo de  ${comment.firstname} ${comment.lastname}`} />
										: <i class="fas fa-user"></i>
									}
								</div>
								<div className = {styles.comment__textframe}>
									<div className = {styles.comment__textframe__autorname}>
										{comment.firstname} {comment.lastname}
									</div>
									<div  className = {styles.comment__textframe__content}>
										{comment.content}
									</div>
								</div>
								<div className = {styles.comment__likes}><span><i class="far fa-thumbs-up"></i>{` ${comment.commentlikeCount}`}</span></div>
								<div className = {styles.comment__dislikes}><span><i class="far fa-thumbs-down"></i>{` ${comment.commentdislikeCount}`}</span></div>
							</div>
						</li>
					)}
				</ul>
			
		
	)
}

CommentsList.propTypes = {
	postId: PropTypes.number
}

export default CommentsList;