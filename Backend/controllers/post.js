// API fs permet les opérations traditionnelles sue les fichiers
const fs = require('fs');
const db = require('../models');
const { Op } = require("sequelize");


exports.getAllPosts = (req, res, next) => {
	
	const { QueryTypes } = require('sequelize');
	db.sequelize.query(`SELECT posts.id AS postId, content, 
	posts.isdeleted AS postIsDeleted, 
	posts.created_at AS createdAt, posts.updated_at AS updatedAt, 
	user_id AS userId, users.lastname, 
	users.firstname, users.email, users.photourl AS userPhotourl,
	users.isdeleted AS userIsDeleted, 
	post_photos.photourl,
    ( SELECT COUNT(*)
        FROM likes
        WHERE
            likes.post_id = posts.id
    ) AS likeCount,
    ( SELECT COUNT(*)
        FROM dislikes
        WHERE
            dislikes.post_id = posts.id
    ) AS dislikeCount
	FROM posts
	left join post_photos on post_photos.post_id = posts.id 
	left join users on users.id = posts.user_id 
	`, { type: QueryTypes.SELECT })
	.then(posts => {
		res.status(200).json(posts)
	})
	.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));

	// where posts.id = 3
	
	/*	{
			attributes: {
				include: [
					[
						db.sequelize.literal(
							`(
								SELECT COUNT (*) FROM likes AS like
								WHERE like.post_id = posts.id
							)`
						), 'countLikes'
					]
				]
			}
		},*/

		/*

		db.Post.findAll(
		{
		include: [{
			model: db.User,
			attributes: ["id", "firstname", "lastname", "isadmin", "photourl"] 
		} ,
		{
			model:  db.PostPhoto,
			attributes: ["photourl"] 
		}
	],
		order: [
			 ['createdAt', 'DESC']
	 ],
  })
  	.then(posts => res.status(200).json(posts))
	.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
*/

};

exports.getPostsByUserId = (req, res, next) => {
	const { QueryTypes } = require('sequelize');
	
	db.sequelize.query(`SELECT posts.id AS postId, content, 
	posts.isdeleted AS postIsDeleted, 
	posts.created_at AS createdAt, posts.updated_at AS updatedAt, 
	user_id AS userId, users.lastname, 
	users.firstname, users.email, users.photourl AS userPhotourl,
	users.isdeleted AS userIsDeleted, 
	post_photos.photourl,
    ( SELECT COUNT(*)
        FROM likes
        WHERE
            likes.post_id = posts.id
    ) AS likeCount,
    ( SELECT COUNT(*)
        FROM dislikes
        WHERE
            dislikes.post_id = posts.id
    ) AS dislikeCount
	FROM posts
	left join post_photos on post_photos.post_id = posts.id 
	left join users on users.id = posts.user_id 
	where posts.user_id = ${req.params.id}`, { type: QueryTypes.SELECT })
	.then(posts => {
		res.status(200).json(posts)
	})
	.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));

	/*
	db.Post.findAll({
		where: {
			user_id: req.params.id
		},
		include: [{
			model: db.User,
			attributes: ["id", "firstname", "lastname", "isadmin", "photourl"] 
			// ajouter les count de likes et dislikes 
			//[Sequelize.fn("COUNT", Sequelize.col("sensors.id")), "sensorCount"]
		} ,
		{
			model:  db.PostPhoto,
			attributes: ["photourl"] 
		},
	//	{
	//		model: db.Like,
	//		attributes: [[db.sequelize.fn('COUNT', db.sequelize.col(id), 'likes')]]
	//	}
	],
		order: [
			 ['createdAt', 'DESC']
	 ],
  })
  	.then(posts => res.status(200).json(posts))
	.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
*/
};

exports.getOnePost = (req, res, next) => {
	db.Post.findOne({
		where: {
			id: req.params.id
		 },
		include: [
			{
				model: db.User,
				attributes: ["id", "firstname", "lastname", "isadmin", "photourl"] 
			} ,
			{
				model:  db.PostPhoto,
				attributes: ["photourl"] 
			}
		],
  })
  	.then(posts => res.status(200).json(posts))
	.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
};



exports.createPost = (req, res, next) => {
	const id = req.body.userId;
	db.User.findOne({ where: { id: id } }) 
        .then(user => {
            db.Post.create({
					UserId: user.id,  
               content: req.body.content,
            })
            .then(post => {
					// проверка на наличие файла, если есть - запись в базу
					if (1) {	//(req.file)
						const filename = 'filename';
						//`${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
						db.PostPhoto.create({
							PostId: post.id,
							photourl: filename,
						})
						.then(postPhoto => {
							console.log(post.content);
							res.status(201).json({ 
								postId: post.id,
								content: post.content,
								isDeleted: post.isdeleted,
								createdAt: post.created_at,
								updatedAt: post.updated_at,
								userId: post.UserId,
								photourl: postPhoto.photourl,
							})
						})
						.catch();
					}else {
						res.status(201).json({ 
							postId: post.id,
							content: post.content,
							isDeleted: post.isdeleted,
							createdAt: post.created_at,
							updatedAt: post.updated_at,
							userId: post.UserId,
					})
					}
				})
            .catch(error => res.status(400).json({ message: "Erreur lors de l'enregistrement !" }))
        })
        .catch(error => res.status(500).json({ error:"Erreur de la base de données !" }));        
};

exports.modifyPost = (req, res, next) => {
};

exports.deletePost = (req, res, next) => {
};

/* ************************* Likes et dislikes ***************************** */

exports.likePost = (req, res, next) => { 
	// ajouter contrôle si il y a une ligne dans dislikes
	db.Like.findOrCreate({
		where: {
			PostId: req.body.postId,
			UserId: req.body.userId
		}
	})
		.then(([like, created]) => {
			console.log(like);
			//  если был лайк - удалить
			if (created) {
				res.status(201).json({ 
					isCreated : created,
					postId: like.PostId, 
					userId: like.UserId,
				})
			} else {
				db.Like.destroy( {where: {id: like.id}} )
					.then(() => {
						res.status(201).json({ 
							isCreated : false,
						})
					})
					.catch(error => res.status(500).json({ error:"Erreur de la base de données !" }));
			}
		})
		.catch(error => res.status(500).json({ error:"Erreur de la base de données !" }));
};

exports.dislikePost = (req, res, next) => {
// ajouter contrôle si il y a une ligne dans likes

	db.Dislike.findOrCreate({
		where: {
			PostId: req.body.postId,
			UserId: req.body.userId
		}
	})
		.then(([dislike, created]) => {
			console.log(dislike);
			//  если был лайк - удалить
			if (created) {
				res.status(201).json({ 
					isCreated : created,
					postId: dislike.PostId, 
					userId: dislike.UserId,
				})
			} else {
				db.Dislike.destroy( {where: {id: dislike.id}} )
					.then(() => {
						res.status(201).json({ 
							isCreated : false,
						})
					})
					.catch(error => res.status(500).json({ error:"Erreur de la base de données 1 !" }));
			}
		})
		.catch(error => res.status(500).json({ error:"Erreur de la base de données !" }));
};

/* ************************* Commentaires ***************************** */

exports.getCommentsByPostId = (req, res, next) => {
};
