import PropTypes from 'prop-types';

import PostItem from './PostItem';
import cn from 'classnames';
import styles from './PostsList.module.css';

const PostsList = ({posts, userId, isAdmin, userPhotourl, setIsPostAdded}) => {

	return (
		<>
			<ul className = {styles.posts__container}>
				{posts.map((post) => 
					<li className = {cn(styles.posts__item,  styles.item)} key = {post.postId} >
						<PostItem post = {post} userId = {userId} isAdmin = {isAdmin} userPhotourl = {userPhotourl} setIsPostAdded = {setIsPostAdded} />
					</li>
				)}
			</ul>
		</>
	)
}

PostsList.propTypes = {
	posts: PropTypes.array,
	userId : PropTypes.number, 
	isAdmin : PropTypes.bool, 
	userPhotourl : PropTypes.string, 
	setIsPostAdded: PropTypes.func
}

export default PostsList;