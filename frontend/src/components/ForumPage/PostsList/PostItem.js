import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentsList from '../CommentsList/CommentsList';
import{ postApiObjet, deleteApiObjet } from '../../../utils/network';
import { API_POSTLIKE, API_POSTDISLIKE, API_POSTS } from '../../../constants/api';
import styles from './PostsList.module.css';

const PostItem = ({post, userId, isAdmin, userPhotourl, setIsPostAdded}) => {

	const [likeCount, setLikeCount] = useState(null);
	const [dislikeCount, setDislikeCount] = useState(null);
	
	const handleLikePost = async () => {
		try {
			// envoyer la requête post avec
			const body = {
				userId: userId,
				postId: post.postId
			}
			const res = await postApiObjet(API_POSTLIKE, body);
			if (res) {
				setLikeCount(res.likeCount);
				setDislikeCount(res.dislikeCount);
			};
		} catch(err) {
			console.log(err);
		}
	}

	const handleDislikePost = async () => {	
		try {
			// envoyer la requête post avec
			const body = {
				userId: userId,
				postId: post.postId
			}
			const res = await postApiObjet(API_POSTDISLIKE, body);
			if (res) {
				setLikeCount(res.likeCount);
				setDislikeCount(res.dislikeCount);
			};
		} catch(err) {
			console.log(err);
		}
	}

	const handleDeletePost = async () => {
		alert('supprimer ce post');
		try {
			const res = await deleteApiObjet(API_POSTS+`/${post.postId}`);
			if (res) {
				setIsPostAdded(true);
			}
		}
		catch(err) {
			console.log(err);
		} 
	}
	
	useEffect(() => {
		if (post) {
			setLikeCount(post.likeCount);
			setDislikeCount(post.dislikeCount);
		}
	}, [post]); 


	return (
		<>
			<div className = {styles.item__autor}>
				<div  className = {styles.item__autor__img}>
					{post.userPhotourl 
						? <img src = {post.userPhotourl} alt = {` ${post.firstname} ${post.lastname}`} />
						: <i className="fas fa-user"></i>
					}
				</div>

				<div className = {styles.item__autor__info}>
					<span>{post.firstname} {post.lastname}</span>
					<span>Publié le {new Date(post.createdAt).toLocaleDateString('fr-FR')} à {new Date(post.createdAt).toLocaleTimeString('fr-FR')} </span>
				</div>
			</div>
			{post.photourl && 
				<div className = {styles.item__imgframe}>
					<div className = {styles.item__img} >
						<img className = "rounded" src = {post.photourl}  alt = 'contenu de post' />
					</div>
				</div>
			}
			<div className = {styles.item__contentframe}>
				<div className = {styles.item__content}>
					{post.content}
				</div>
				<div className = {styles.item__deletebtnframe}>
					{((post.userId === userId) || isAdmin) &&
						<div className = {styles.item__deletebtn}
								aria-label ="Supprimer ce post" role = "button" 
								title = "Supprimer ce post"
								onClick = {handleDeletePost}>
							<i className="fas fa-trash-alt"></i>
						</div>
						}
				</div>
			</div>
			
			<div className = {styles.item__likes}>
				<div onClick = {handleLikePost}><i className="far fa-thumbs-up"></i> {likeCount} </div>
				<div onClick = {handleDislikePost}><i className="far fa-thumbs-down"></i>{` ${dislikeCount}`}</div>
			</div>

			<div >
				<CommentsList postId = {post.postId} userId = {userId} isAdmin = {isAdmin} userPhotourl = {userPhotourl} />
			</div>

		</>
	)
}

PostItem.propTypes = {
	post: PropTypes.object,
	userId: PropTypes.number,
	isAdmin : PropTypes.bool,
	userPhotourl: PropTypes.string,
	setIsPostAdded: PropTypes.func
}

export default PostItem;