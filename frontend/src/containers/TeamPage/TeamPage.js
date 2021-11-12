import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withErrorApi } from '../../hoc-helpers/withErrorApi';
import TeamList from '../../components/ForumPage/TeamList/TeamList';
import{ getApiResource } from '../../utils/network'
import { API_USERS } from '../../constants/api'

//import styles from './TeamPage.module.css';


const TeamPage = ({ setErrorApi }) => {
	const [team, setTeam] = useState(null);

	useEffect(() => {
		async function getResource  (url) {
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
				// filter pour enlever de la liste des utilisateurs désinscrits, qui sont présents dans la base de donnée
				const teamListEx = teamList.filter((user) => {
					return !user.isDeleted
			  });
				setTeam(teamListEx);
				setErrorApi(false);
			} else {
				setErrorApi(true);
			}
		}

		getResource(API_USERS);
	}, [setErrorApi])

	return (
		<>
			{team && <TeamList team = {team}/>}
		</>
	)
}

TeamPage.propTypes = {
	setErrorApi: PropTypes.func
}

export default withErrorApi(TeamPage);

