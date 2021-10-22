import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withErrorApi } from '../../hoc-helpers/withErrorApi';
import Banner from '../../components/Banner/Banner';
import TeamList from '../../components/ForumPage/TeamList/TeamList';
import{ getApiResource } from '../../utils/network'
import { API_USERS } from '../../constants/api'

//import styles from './TeamPage.module.css';


const TeamPage = ({ setErrorApi }) => {
	const [team, setTeam] = useState(null);
/*
	const getResource = async (url) => {
		const res = await getApiResource(url);
	//	console.log(res);
		if (res) {
			const teamList = res.map(({userId, content, firstname, lastname, email, photourl, isAdmin, isDeleted}) => {
				return {
					userId,
					content, 
					firstname, 
					lastname, 
					email, 
					photourl, 
					isAdmin, 
					isDeleted
				}
			})
			setTeam(teamList);
			setErrorApi(false);
		} else {
			setErrorApi(true);
		}
	}
*/
	useEffect(() => {
		const getResource = async (url) => {
			const res = await getApiResource(url);
			if (res) {
				const teamList = res.map(({userId, content, firstname, lastname, email, photourl, isAdmin, isDeleted}) => {
					return {
						userId,
						content, 
						firstname, 
						lastname, 
						email, 
						photourl, 
						isAdmin, 
						isDeleted
					}
				})
				setTeam(teamList);
				setErrorApi(false);
			} else {
				setErrorApi(true);
			}
		}

		getResource(API_USERS);
	}, [])

	return (
		<>
			<Banner />
			{team && <TeamList team = {team}/>}
		</>
	)
}

TeamPage.propTypes = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(TeamPage);

