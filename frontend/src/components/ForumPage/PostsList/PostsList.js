import PropTypes from 'prop-types';

import styles from './PostsList.module.css';

const PostsList = ({posts}) => {
	return (
		<>
			<ul className = {styles.list__container}>
				{posts.map(({postId, content}) => 
					<li className = {styles.list__item} key = {postId} >{content}</li>
				)}
			</ul>
		</>
	)
}

PostsList.propTypes = {
	posts: PropTypes.array
}

export default PostsList;