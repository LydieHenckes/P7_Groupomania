import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import avatar from '../../../assets/avatar.png'
import styles from './TeamList.module.css';

const TeamList = ({team}) => {
	
	return (
		<>
			<ul className = {styles.team__container}>
				{team.map(({userId, firstname, lastname, photourl}) => 
					<li className = {styles.person} key = {userId}>
						<Link to ={`/users/${userId}`}>
							{photourl && <img className = {styles.person__photo} src = {photourl} alt = {firstname} />}
							{!photourl && <img className = {styles.person__photo} src = {avatar} alt = {firstname} />}
							<p>{firstname} {lastname}</p>
						</Link>
					</li>
				)} 
			</ul>
		</>
	)
}

TeamList.propTypes = {
	team: PropTypes.array
}

export default TeamList;