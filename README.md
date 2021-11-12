### Projet 7 du parcours Développeur Web (Openclassrooms)
Réseau Social Groupomania: projet frontend et backend.

Ce projet utilise NodeJs, Express et MySQL pour le backend, et React pour le frontend. 

#### INSTALLATION

Veuillez cloner ce dépôt : il vous fournira les deux dossiers nécessaires : backend et frontend.

#### ACCÈS À LA BASE DE DONNÉES

Vous devez avoir MySQL installé sur votre ordinateur. Cette application utilise le plugin dotenv pour masquer les données de connexion. Dans le dossier backend, vous trouverez un fichier ".env__", qui vous donnera accès à la base de données MySQL groupomania. Veuillez d’abord créer dans MySQL une base de données, un utilisateur avec son mot de passe qui aura accès à cette base de données. Puis remplissez avec les valeurs correctes pour les variables "DB_DATABASE", "DB_USER" et "DB_PASS", dans le ficher ".env__" et changez son nom en ".env".

#### EXÉCUTER L'APPLICATION

Vous aurez besoin de deux fenêtres de terminal : une pour le frontend, une pour le backend. 
Sur le terminal backend : exécutez "npm install, puis "node server" ou "nodemon server". Le serveur doit fonctionner sur localhost avec le port par défaut 8080.
Puis, sur le terminal frontend : lancez "npm install pour installer tous les plugins nécessaires, puis "npm start". Le frontend de l'application est visible sur http:// localhost: 3000/. 
