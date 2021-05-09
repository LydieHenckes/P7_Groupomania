import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withErrorApi } from '../../hoc-helpers/withErrorApi'
import PostsList from '../../components/ForumPage/PostsList/PostsList';
import{ getApiResource } from '../../utils/network'
import { API_POSTS } from '../../constants/api'

import styles from './ForumPage.module.css';


const ForumPage = ({ setErrorApi }) => {
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
	}, [])

	return (
		<>
			{posts && <PostsList posts = {posts}/>}
		</>
	)
}

ForumPage.propTypes = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(ForumPage);

