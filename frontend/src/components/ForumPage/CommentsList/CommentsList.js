import { useState, useEffect } from 'react';

import CommentItem from './CommentItem';
import CommentNew from './CommentNew';
import{ getApiResource } from '../../../utils/network';
import { API_COMMENTS } from '../../../constants/api';
import PropTypes from 'prop-types';
import styles from './CommentsList.module.css';

const CommentsList = ({postId, userId, userPhotourl}) => {
	const [comments, setComments] = useState([]);
	const [isCommentAddedDeleted, setIsCommentAddedDeleted] = useState(false); 

	

	useEffect(() => {
		async function getComments(url) {
			try {
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
					setIsCommentAddedDeleted(false); //!!!
				}
			} catch(err) {
				console.log(err);
			} finally {

			}
		}
		getComments(API_COMMENTS+`/${postId}`);
	}, [postId, isCommentAddedDeleted]);

	return (
		<ul className = {styles.comments__container}>
			{comments.map((comment) => 
				<li key = {comment.commentId}>
					<CommentItem comment = {comment} userId = {userId} setIsCommentAddedDeleted = {setIsCommentAddedDeleted} />
				</li>
			)}
			
			<CommentNew postId = {postId} userId = {userId} userPhotourl = {userPhotourl} setIsCommentAddedDeleted = {setIsCommentAddedDeleted}  />
		</ul>
	)
}

CommentsList.propTypes = {
	postId: PropTypes.number,
	userId: PropTypes.number,
	userPhotourl: PropTypes.string
}

export default CommentsList;