/* Les routes pour les requêtes generales sur comments */

const express = require('express');


// importation de middleware d'authéntification
const auth = require('../middleware/auth');

// importation de middleware pour les images
const multer = require('../middleware/multer-config');

// utilisation de la classe express.Router pour créer des gestionnaires de route pour les comments
const router = express.Router();

// la logique métier décrite dans controllers/post.js
const commentCtrl = require('../controllers/comment');


// renvoie des comments correspondant à un postId
router.get('/:id', commentCtrl.getCommentsByPostId);

// crée un nouveau comment dans la base comments
router.post('/', multer, commentCtrl.createComment);

//suppression d'un comment
router.delete('/:id', commentCtrl.deleteComment);

//like d'un comment
router.post('/like', commentCtrl.likeComment);

//dislike d'un comment
router.post('/dislike', commentCtrl.dislikeComment);


module.exports = router;
