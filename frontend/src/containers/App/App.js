import cn from 'classnames';

import ForumPage from '../FomumPage/ForumPage'
import Banner from '../../components/Banner/Banner'

import styles from './App.module.css';


//className = {cn(styles.App, styles.text)}



const App = () => {
  return (
    <div >
      <Banner />
      <ForumPage />
    </div>
  )
}

export default App;
