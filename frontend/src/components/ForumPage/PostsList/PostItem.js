import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentsList from '../CommentsList/CommentsList';
import{ postApiObjet } from '../../../utils/network';
import { API_POSTLIKE, API_POSTDISLIKE } from '../../../constants/api';
import styles from './PostsList.module.css';
import cn from 'classnames';

const PostItem = ({post, userId, userPhotourl}) => {
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(null);
	const [dislikeCount, setDislikeCount] = useState(null);

	const handleLikePost = async () => {
		// envoyer la requête post avec
		const body = {
			userId: userId,
			postId: post.postId
		}
		const res = await postApiObjet(API_POSTLIKE, body);
		if (res) {
			setLiked(true);
		   setLikeCount(res.likeCount);
		   setDislikeCount(res.dislikeCount);
		} else {

		};

	}

	const handleDislikePost = async () => {
		// envoyer la requête post avec
		const body = {
			userId: userId,
			postId: post.postId
		}
		const res = await postApiObjet(API_POSTDISLIKE, body);
		if (res) {
			setLiked(true);
		   setLikeCount(res.likeCount);
		   setDislikeCount(res.dislikeCount);
		} else {

		};
	}

	
	useEffect(() => {
		setLikeCount(post.likeCount);
		setDislikeCount(post.dislikeCount);
	}, []); 


	//className = {cn(styles.App, styles.text)}		className = {styles.item__img}
	return (
		<>
			<div className = {styles.item__autor}>
				<div  className = {styles.item__autor__img}>
					{post.userPhotourl 
						? <img src = {post.userPhotourl} alt = {`Photo de  ${post.firstname} ${post.lastname}`} />
						: <i className="fas fa-user"></i>
					}
				</div>

				<div className = {styles.item__autor__info}>
					<span>{post.firstname} {post.lastname}</span>
					<span>Publié le {new Date(post.createdAt).toLocaleDateString('fr-FR')} à {new Date(post.createdAt).toLocaleTimeString('fr-FR')} </span>
				</div>
			</div>
			{post.photourl && 
					<div className = {styles.item__img} >
						<img className = "rounded" src = {post.photourl} alt = {`image de post`} />
					</div>
			}

			<p className = {styles.item__content}>
				{post.content}
			</p>

			<div className = {styles.item__likes}>
				<div onClick = {handleLikePost}><i class="far fa-thumbs-up"></i> {likeCount} </div>
				<div onClick = {handleDislikePost}><i class="far fa-thumbs-down"></i>{` ${dislikeCount}`}</div>
			</div>

			<div className = {styles.item__comments}>
				<CommentsList postId = {post.postId} userId = {userId} userPhotourl = {userPhotourl} />
			</div>

		</>
	)
}

PostItem.propTypes = {
	post: PropTypes.object,
	userId: PropTypes.number,
	userPhotourl: PropTypes.string
}

export default PostItem;