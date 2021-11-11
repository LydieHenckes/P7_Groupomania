/* Les routes pour les requêtes generales sur posts */

const express = require('express');

// importation de middleware d'authéntification
const auth = require('../middleware/auth');

// importation de middleware pour les images
const multer = require('../middleware/multer-config');

// utilisation de la classe express.Router pour créer des gestionnaires de route pour les posts
const router = express.Router();

// la logique métier décrite dans controllers/post.js
const postCtrl = require('../controllers/post');

// renvoie tous les posts  
router.get('/', auth,  postCtrl.getAllPosts);

// renvoie un post correspondant à un id
router.get('/:id', auth, postCtrl.getOnePost);

// renvoie des posts correspondant à un userId
router.get('/:id/user', auth,  postCtrl.getPostsByUserId);

// crée un nouveau post dans la base posts
router.post('/', auth, multer, postCtrl.createPost);

// modification de post 
router.put('/:id',  auth, postCtrl.modifyPost);

//suppression d'un post
router.delete('/:id', auth, postCtrl.deletePost);

//like d'un post //auth,
router.post('/like',  auth, postCtrl.likePost);

//dislike d'un post
router.post('/dislike', auth,  postCtrl.dislikePost);


module.exports = router;
