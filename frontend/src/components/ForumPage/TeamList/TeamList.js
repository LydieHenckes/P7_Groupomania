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
							{photourl && <div className = {styles.person__photo}><img  src = {photourl} alt = {firstname} /></div>}
							{!photourl && <div className = {styles.person__photo}><img  src = {avatar} alt = {firstname} /></div>}
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