/* Les routes pour les requêtes d'authéntification des users*/

const express = require('express');
// const validatePassword = require('../middleware/validatePassword');  validatePassword,
// utilisation de la classe express.Router pour créer des gestionnaires de route pour les users
const router = express.Router();

// la logique métier décrite dans controllers/user.js
const userCtrl = require('../controllers/user');

// inscription
router.post('/signup',  userCtrl.signup);

//connection
router.post('/login', userCtrl.login);

//authentification d'un utilisateur
router.get('/user', userCtrl.user);

//logout d'un utilisateur
router.post('/logout', userCtrl.logout);

module.exports = router;