import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withErrorApi } from '../../hoc-helpers/withErrorApi'
import Banner from '../../components/Banner/Banner'
import PostsList from '../../components/ForumPage/PostsList/PostsList';
import{ getApiResource } from '../../utils/network'
import { API_POSTS } from '../../constants/api'


import styles from './ForumPage.module.css';


const ForumPage = ({ setErrorApi, firstname, lastname }) => {
	const [posts, setPosts] = useState(null);

	

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
			setErrorApi(false);
		} else {
			setErrorApi(true);
		}
		
	}

	useEffect(() => {
		getResource(API_POSTS);
	}, []) //

	return (
		<>
			<Banner />
			<div>
				{firstname ? 'Bienvenue '+ firstname +' '+ lastname : "Vous n'êtes pas connecté !" } 
			</div>
			{firstname && posts && <PostsList posts = {posts}/>}
		</>
	)
}

ForumPage.propTypes = {
	setErrorApi: PropTypes.func,
	setFirstname: PropTypes.func, 
	setLastname :PropTypes.func
}

export default withErrorApi(ForumPage);

