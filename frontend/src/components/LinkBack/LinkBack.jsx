import { useHistory } from 'react-router-dom';
import iconBack from './img/back.svg';

import styles from './LinkBack.module.css';

const LinkBack = () => {
    const history = useHistory();

    const handleGoBack = () => {
        history.goBack();
    }

    return (
        <div aria-label ="Retour" role = "button" title = "Retour"
            onClick={handleGoBack}
            className={styles.link}
        >
            <img className={styles.link__img} src={iconBack} alt="Retour"/>
            <span>Retour</span>
        </div>
    )
}

export default LinkBack;