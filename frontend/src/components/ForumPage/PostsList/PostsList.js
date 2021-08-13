import PropTypes from 'prop-types';
import CommentsList from '../CommentsList/CommentsList';
import PostItem from './PostItem';
import cn from 'classnames';
import styles from './PostsList.module.css';

//<i class="fas fa-thumbs-up"></i>
//<i class="fas fa-thumbs-down"></i>


const PostsList = ({posts, userId}) => {



	return (
		<>
			<ul className = {styles.posts__container}>
				{posts.map((post) => 
					<li className = {cn(styles.posts__item,  styles.item)} key = {post.postId} >
						<PostItem post = {post} userId = {userId}/>
					</li>
				)}
			</ul>
		</>
	)
}

PostsList.propTypes = {
	posts: PropTypes.array
}

export default PostsList;