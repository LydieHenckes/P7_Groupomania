import { useState, useEffect } from 'react';
import { BrowserRouter, Switch,  Route } from 'react-router-dom';

import LogInPage from '../LogInPage/LogInPage';
import RegisterPage from '../LogInPage/RegisterPage';
import ForumPage from '../FomumPage/ForumPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import TeamPage from '../TeamPage/TeamPage';
import PersonPage from '../PersonPage/PersonPage';
import ProfilPage from '../ProfilPage/ProfilPage';
import Header from '../../components/Header/Header'
import { API_AUTH_AUTHUSER } from '../../constants/api'

import  './App.css';

const App = () => {
  const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
  const [userId, setUserId] = useState(null);
  const [userPhotourl, setUserPhotourl] = useState('');
  const [isProfilChanged, setIsProfilChanged] = useState(false);

  useEffect(() => {
    async function fetchAuth() {
      // setDataLoading(true);
      try {
        const res = await fetch(API_AUTH_AUTHUSER, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          });
          const content = await res.json();
          console.log('content: ', content);
          setFirstname(content.firstName);
          setLastname(content.lastName);
          setUserId(content.userId);
          setUserPhotourl(content.photourl);
          setIsProfilChanged(false);
      } catch (err) {
          console.log(err);
      } finally {
        //  setDataLoading(false);
      }
    }
    fetchAuth();
  }, [isProfilChanged])
 /*
  useEffect(() => {
    async function fetchAuth() {
      // setDataLoading(true);
      console.log('firstname - début', firstname);
      setFirstname('');
      try {
        const res = await fetch(API_AUTH_AUTHUSER, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          });
          const content = await res.json();
          setFirstname(content.firstName);
          setLastname(content.lastName);
          setUserId(content.userId);
          setUserPhotourl(content.photourl);
          setIsProfilChanged(false);
          console.log('firstname - succès', firstname);
      } catch (err) {
          console.log(err);
          setLastname('');
          setUserId(null);
          console.log('firstname - err', firstname);
      } finally {
        //  setDataLoading(false);
      }
    }

    fetchAuth();


  }, [isProfilChanged])
  */
// 
  return (
    <>
      <BrowserRouter>
      
        <Header firstname = {firstname} setFirstname = {setFirstname} setLastname = {setLastname} setUserId = {setUserId} />

        <Switch>
          <Route path = "/" exact component= {() => <ForumPage firstname = {firstname} lastname = {lastname} userId = {userId} userPhotourl = {userPhotourl} setIsProfilChanged = {setIsProfilChanged} />}/>
          <Route path = "/login" exact component= {() => <LogInPage setFirstname = {setFirstname} setLastname = {setLastname} setUserId = {setUserId}  setUserPhotourl= {setUserPhotourl} setIsProfilChanged = {setIsProfilChanged}  />}/>
          <Route path = "/register" exact component= {() => <RegisterPage  isAdmin = {false} />} />
          <Route path = "/registeradmin" exact component= {() => <RegisterPage  isAdmin = {true} />}/>
          <Route path = "/users" exact component= {TeamPage}/>
          <Route path = "/users/:id" exact component= {PersonPage}/>
          <Route path = "/profil" exact component= {() => <ProfilPage userId = {userId} setFirstname = {setFirstname} setLastname = {setLastname} setUserId = {setUserId} setIsProfilChanged = {setIsProfilChanged} />}/>
          <Route path = "*" exact component= {NotFoundPage}/>
          
        </Switch>
      </BrowserRouter>

    </>
  )
}

export default App;
