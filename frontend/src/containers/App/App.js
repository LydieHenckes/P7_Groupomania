//import cn from 'classnames';
import { useState, useEffect, useIsMounted } from 'react';
import { BrowserRouter, Switch, NavLink, Route } from 'react-router-dom';
import routesConfig from '../../routes/routesConfig'
import LogInPage from '../LogInPage/LogInPage';
import RegisterPage from '../LogInPage/RegisterPage';
import ForumPage from '../FomumPage/ForumPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import TeamPage from '../TeamPage/TeamPage';
import PersonPage from '../PersonPage/PersonPage';
import Header from '../../components/Header/Header'
import { API_AUTH_AUTHUSER } from '../../constants/api'

import  './App.css';

//className = {cn(styles.App, styles.text)}

const App = () => {
  const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');

 // const isMounted = useIsMounted();

  /*  if (isMounted()) {
        
      } */
	
    useEffect(() => {
    
   // if (firstname!=='') return;
		(
			async () => {

				const res = await fetch(API_AUTH_AUTHUSER, {
					headers: {'Content-Type': 'application/json'},
					credentials: 'include',
			  });
			  const content = await res.json();
        console.log('content22: ',content);  
        
        if (content.hasOwnProperty('firstName')) {
          setFirstname(content.firstName);
        
          setLastname(content.lastName);
        }
			 
			}
		)();

	}) 
  
  //
  // component={route.component} 
  /*
        <BrowserRouter>
        <Header />

        <Switch>
          {routesConfig.map((route, index)=> (
            <Route 
              key = {index}
              path={route.path} 
              exact = {route.exact}
              component={route.component} 
            />
          ))}
        </Switch>
      </BrowserRouter>
  */
 // 
  return (
    <>
      <BrowserRouter>
      
        <Header firstname = {firstname} setFirstname = {setFirstname} setLastname = {setLastname} />

        <Switch>
          <Route path = "/" exact component= {() => <ForumPage firstname = {firstname} lastname = {lastname}/>}/>
          <Route path = "/login" exact component= {() => <LogInPage firstname = {firstname} setFirstname = {setFirstname} setLastname = {setLastname}/>}/>
          <Route path = "/register" exact component= {RegisterPage}/>
          <Route path = "/users" exact component= {TeamPage}/>
          <Route path = "/users/:id" exact component= {PersonPage}/>
          <Route path = "*" exact component= {NotFoundPage}/>
          
        </Switch>
      </BrowserRouter>

    </>
  )
}

export default App;
