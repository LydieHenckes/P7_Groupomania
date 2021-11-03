import LogIn from '../../components/Log/LogIn';


const LogInPage = ({setFirstname, setLastname, setUserId, setUserPhotourl, setIsProfilChanged}) => {
	return (
		<>
			<LogIn  setFirstname = {setFirstname} setLastname = {setLastname} setUserId = {setUserId}  setUserPhotourl= {setUserPhotourl} setIsProfilChanged = {setIsProfilChanged} />
		</>
	)
}

export default LogInPage;