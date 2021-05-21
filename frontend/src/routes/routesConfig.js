import LogInPage from '../containers/LogInPage/LogInPage';
import RegisterPage from '../containers/LogInPage/RegisterPage';
import ForumPage from '../containers/FomumPage/ForumPage';
import NotFoundPage from '../containers/NotFoundPage/NotFoundPage';
import TeamPage from '../containers/TeamPage/TeamPage';
import PersonPage from '../containers/PersonPage/PersonPage';

const routesConfig = [
	{
		path : "/login",
		exact: true,
		component: LogInPage
	},
	{
		path : "/register",
		exact: true,
		component: RegisterPage
	},
	{
		path : "/",
		exact: true,
		component: ForumPage
	},
	{
		path : "/users",
		exact: true,
		component: TeamPage
	},
	{
		path : "/users/:id",
		exact: true,
		component: PersonPage
	},
	{
		path : "*",
		exact: false,
		component: NotFoundPage
	},
]

export default routesConfig;