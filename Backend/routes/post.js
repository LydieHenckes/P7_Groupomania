/* Les routes pour les requêtes generales sur posts */

const express = require('express');

// importation de middleware d'authéntification
const auth = require('../middleware/auth');

// utilisation de la classe express.Router pour créer des gestionnaires de route pour les posts
const router = express.Router();

// la logique métier décrite dans controllers/post.js
const postCtrl = require('../controllers/post');

// renvoie tous les posts  
router.get('/', postCtrl.getAllPosts);

// renvoie des posts correspondant à un userId
router.get('/:id', postCtrl.getOnePost);

// renvoie des posts correspondant à un userId
router.get('/:id/user', postCtrl.getPostsByUserId);

// crée un nouveau post dans la base posts
router.post('/', postCtrl.createPost);

// modification de post 
router.put('/:id',  postCtrl.modifyPost);

//suppression d'un post
router.delete('/:id', postCtrl.deletePost);

//like d'un post //auth,
router.post('/like',  postCtrl.likePost);

//dislike d'un post
router.post('/dislike', postCtrl.dislikePost);


module.exports = router;
