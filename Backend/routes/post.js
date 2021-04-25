/* Les routes pour les requêtes generales sur users */

const express = require('express');

// utilisation de la classe express.Router pour créer des gestionnaires de route pour les users
const router = express.Router();

// la logique métier décrite dans controllers/post.js
const postCtrl = require('../controllers/post');

// renvoie tous les posts  
router.get('/', postCtrl.getAllPosts);

// renvoie des posts correspondant à un userId
router.get('/:id', postCtrl.getOnePost);

// renvoie des posts correspondant à un userId
router.get('/:id/user', postCtrl.getPostsByUserId);

// renvoie des comments correspondant à un post id
router.get('/:id/comments', postCtrl.getCommentsByPostId);

// crée un nouveau post dans la base posts
router.post('/', postCtrl.createPost);

// modification de post 
router.put('/:id',  postCtrl.modifyPost);

//suppression d'un post
router.delete('/:id', postCtrl.deletePost);

//like d'un post
router.post('/like', postCtrl.likePost);

//dislike d'un post
router.post('/dislike', postCtrl.dislikePost);


module.exports = router;
