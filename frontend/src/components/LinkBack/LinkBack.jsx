import { useHistory } from 'react-router-dom';
import iconBack from './img/back.svg';

import styles from './LinkBack.module.css';

const LinkBack = () => {
    const history = useHistory();

    const handleGoBack = () => {
        history.goBack();
    }

    const handleKeyDownGoBack = (event) => {
		if(event.keyCode === 32 || event.keyCode === 13){
			event.preventDefault();
            history.goBack();
		 } 
    }

    return (
        <div aria-label ="Retour" role = "button" tabindex="0" title = "Retour"
            onClick={handleGoBack}
            className={styles.link}
            onKeyDown = {handleKeyDownGoBack}
        >
            <img className={styles.link__img} src={iconBack} alt="Retour"/>
            <span>Retour</span>
        </div>
    )
}

export default LinkBack;