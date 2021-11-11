import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withErrorApi } from '../../hoc-helpers/withErrorApi'
import PostsList from '../../components/ForumPage/PostsList/PostsList';
import PostNew from '../../components/ForumPage/PostsList/PostNew';
import{ getApiResource } from '../../utils/network';
import { API_POSTS } from '../../constants/api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import cn from 'classnames';
import  '../App/App.css';
import styles from './ForumPage.module.css';

//setErrorApi,
const ForumPage = ({  firstname, lastname, userId, userPhotourl, isProfilChanged }) => {
	const [posts, setPosts] = useState(null);
	const [isPostAdded, setIsPostAdded] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		let isMounted = true;
		getApiResource(API_POSTS).then(res => {
			if (res) {
				const postsList = res.map(({postId, content, postIsDeleted, createdAt, userId,  firstname, lastname, userPhotourl, userIsDeleted, photourl, likeCount, dislikeCount}) => {
					return {
						postId,
						content,
						postIsDeleted,
						createdAt,
						userId,
						firstname,
						lastname,
						userPhotourl,
						userIsDeleted,
						photourl,
						likeCount,
						dislikeCount
					}
				})
				if (isMounted) {
					setPosts(postsList);
					setIsPostAdded(false);
					//setErrorApi(false);
				}
			}
		})
		.catch(error => {
			if (isMounted) {
				setError(true);
			} //setErrorApi(true);
			console.log(error);
		})
		return () => { isMounted = false };
	}, [isPostAdded, isProfilChanged])


	
	return (
		<>
			{error && <ErrorMessage />}
			{!error && 
			<div className = 'wrapper'>
				<div className = {cn(styles.forum__element, styles.intro)}>
					{firstname ? 'Bienvenue '+ firstname +' '+ lastname : 
						<div>
							<span>Bienvenue sur le réseau social de Groupomania !</span>  
							<br />
							<span>Pour participer connectez-vous !</span>
						</div>
					}
				</div>
				{firstname && <PostNew userId = {userId} userPhotourl = {userPhotourl} setIsPostAdded = {setIsPostAdded} />} 
				{firstname && posts && <PostsList posts = {posts} userId = {userId} userPhotourl = {userPhotourl} setIsPostAdded = {setIsPostAdded} />}
			</div>}
		</>

		
	)
}

ForumPage.propTypes = { 
	setErrorApi: PropTypes.func,
	firstname : PropTypes.string,
	lastname : PropTypes.string,
	userId: PropTypes.number,
	userPhotourl: PropTypes.string,
	isProfilChanged : PropTypes.bool
}

export default withErrorApi(ForumPage);

