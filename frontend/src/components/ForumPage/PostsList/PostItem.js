import PropTypes from 'prop-types';
import CommentsList from '../CommentsList/CommentsList';
import styles from './PostsList.module.css';

const PostItem = ({post}) => {

	const handleLikePost = () => {
		// envoyer la requête post avec
		/*
		localhost:3000/api/posts/like
		{
		"userId" : "3",
		"postId" : "1"
		}
		*/
		alert('like');
	}

	const handleDislikePost = () => {
		// envoyer la requête post avec
		/*
		localhost:3000/api/posts/dislike
		{
		"userId" : "3",
		"postId" : "1"
		}
		*/
		alert('dislike');
	}

	return (
		<>
			<div className = {styles.item__autor}>
				<div  className = {styles.item__autor__img}>
					{post.userPhotourl 
						? <img src = {post.userPhotourl} alt = {`Photo de  ${post.firstname} ${post.lastname}`} />
						: <i class="fas fa-user"></i>
					}
				</div>

				<div className = {styles.item__autor__info}>
					<span>{post.firstname} {post.lastname}</span>
					<span>Publié le {new Date(post.createdAt).toLocaleDateString('fr-FR')} à {new Date(post.createdAt).toLocaleTimeString('fr-FR')} </span>
				</div>
			</div>
			{post.photourl && 
					<div className = {styles.item__img}>
						<img src = {post.photourl} alt = {`image de post`} />
					</div>
			}

			<p className = {styles.item__content}>
				{post.content}
			</p>

			<div className = {styles.item__likes}>
				<div onClick = {handleLikePost}><i class="far fa-thumbs-up"></i>{` ${post.likeCount}`}</div>
				<div onClick = {handleDislikePost}><i class="far fa-thumbs-down"></i>{` ${post.dislikeCount}`}</div>
			</div>

			<div className = {styles.item__comments}>
				<CommentsList postId = {post.postId} />
			</div>

		</>
	)
}

PostItem.propTypes = {
	post: PropTypes.object
}

export default PostItem;