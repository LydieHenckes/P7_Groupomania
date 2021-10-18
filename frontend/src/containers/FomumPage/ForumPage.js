import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withErrorApi } from '../../hoc-helpers/withErrorApi'
import PostsList from '../../components/ForumPage/PostsList/PostsList';
import PostTest from '../../components/ForumPage/PostsList/PostTest';
import PostNew from '../../components/ForumPage/PostsList/PostNew';
import{ getApiResource } from '../../utils/network'
import { API_POSTS } from '../../constants/api'

import cn from 'classnames';
import  '../App/App.css';
import styles from './ForumPage.module.css';


const ForumPage = ({ setErrorApi, firstname, lastname, userId, userPhotourl }) => {
	const [posts, setPosts] = useState(null);
	const [isPostAdded, setIsPostAdded] = useState(false);

	const getResource = async (url) => {
		const res = await getApiResource(url);
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
			setPosts(postsList);
			setIsPostAdded(false);
			setErrorApi(false);
		} else {
			setErrorApi(true);
		}
		
	}

	useEffect(() => {
		getResource(API_POSTS);
	}, [isPostAdded]) //
// 
	
	return (
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
			{firstname && posts && <PostsList posts = {posts} userId = {userId} userPhotourl = {userPhotourl} />}
		</div>
	)
}

ForumPage.propTypes = {
	setErrorApi: PropTypes.func,
	setFirstname: PropTypes.func, 
	setLastname :PropTypes.func
}

export default withErrorApi(ForumPage);

