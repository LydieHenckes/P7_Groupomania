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
	users.firstname, users.photourl AS userPhotourl,
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
	users.firstname, users.photourl AS userPhotourl,
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
		{
			model: db.Like,
			attributes: [[db.Sequelize.fn('COUNT', db.Sequelize.col(id), 'likes')]]
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

exports.getOnePost = (req, res, next) => {
	const { QueryTypes } = require('sequelize');
	
	db.sequelize.query(`SELECT posts.id AS postId, content, 
	posts.isdeleted AS postIsDeleted, 
	posts.created_at AS createdAt, posts.updated_at AS updatedAt, 
	user_id AS userId, users.lastname, 
	users.firstname,  users.photourl AS userPhotourl,
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
	where posts.id = ${req.params.id}`, { type: QueryTypes.SELECT })
	.then(posts => {
		res.status(200).json(posts)
	})
	.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
	/*********************** */
	/*
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
	*/
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
								postIsDeleted: post.isdeleted,
								createdAt: post.createdAt,
								updatedAt : post.updatedAt,
								userId: post.UserId,
								photourl: postPhoto.photourl,
							})
						})
						.catch(error => res.status(500).json({ error:"Erreur de la base de données !" }));
					}else {
						res.status(201).json({ 
							postId: post.id,
							content: post.content,
							postIsDeleted: post.isdeleted,
							createdAt: post.createdAt,
							updatedAt : post.updatedAt,
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
	db.Post.findByPk(req.params.id)
	.then(post => {
		if (!post) {
			res.status(400).json({ error: "Post n'existe pas !" })
		} else {
			// если есть к посту картинка- удалить
			db.PostPhoto.findOne({ where: { post_id: req.params.id} })
			.then(postPhoto => {
				post.destroy({ where: { id: req.params.id} })
					.then(() => res.status(200).json({ message: "Post supprimé !" }))
					.catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de post !" }));
	/*  // changer pour ce code si il y a des vrais images
			if (postPhoto) {
				const filename = postPhoto.photourl.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
					// supprimer post
					post.destroy({ where: { id: req.params.id} })
					.then(() => res.status(200).json({ message: "Post supprimé !" }))
					.catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de post !" }));
				})
				} else {
					post.destroy({ where: { id: req.params.id} })
					.then(() => res.status(200).json({ message: "Post supprimé !" }))
					.catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de post !" }));
				}
				*/
			})
			.catch(error => res.status(400).json({ error :"L'erreur de la base de données !"}));
		}
	})
	.catch(error => res.status(400).json({ error :"L'erreur de la base de données !"})); 
};

/* ************************* Likes et dislikes ***************************** */

exports.likePost = (req, res, next) => { 
	// ajouter contrôle si il y a une ligne dans dislikes
	db.Dislike.findOne({
		where: {
			PostId: req.body.postId,
			UserId: req.body.userId
		}
	})
	.then(dislike => {
		if (!dislike) {
			// si il n'y avait pas dislike - création d'un like et retourner likeCount et dislikeCount
			// si il y avait un like - retourner likeCount et dislikeCount
			db.Like.findOrCreate({
				where: {
					PostId: req.body.postId,
					UserId: req.body.userId
				}
			})
			.then(([like, created]) => {
						const { QueryTypes } = require('sequelize');
						db.sequelize.query(`SELECT
							( SELECT COUNT(*) FROM likes WHERE likes.post_id =${req.body.postId} ) AS likeCount,
							( SELECT COUNT(*) FROM dislikes WHERE dislikes.post_id = ${req.body.postId} ) AS dislikeCount
						`, { type: QueryTypes.SELECT })
						.then(likesCount => {
							res.status(201).json({ 
								isCreated : created,
								isDeleted: false,
								postId: like.PostId, 
								userId: like.UserId,
								likeCount: likesCount[0].likeCount,
								dislikeCount: likesCount[0].dislikeCount
							})
						})
						.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
			})
			.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
		} else {
			// il faut supprimer dislike
			db.Dislike.destroy( {where: {id: dislike.id}} )
				.then(() => {
					// si il n'y avait pas dislike - création d'un like et retourner likeCount et dislikeCount
					// si il y avait un like - retourner likeCount et dislikeCount
					db.Like.findOrCreate({
						where: {
							PostId: req.body.postId,
							UserId: req.body.userId
						}
					})
					.then(([like, created]) => {
								console.log('----**********************-------------------');
								const { QueryTypes } = require('sequelize');
								db.sequelize.query(`SELECT
									( SELECT COUNT(*) FROM likes WHERE likes.post_id =${req.body.postId} ) AS likeCount,
									( SELECT COUNT(*) FROM dislikes WHERE dislikes.post_id = ${req.body.postId} ) AS dislikeCount
								`, { type: QueryTypes.SELECT })
								.then(likesCount => {

									res.status(201).json({ 
										isCreated : created,
										isDeleted: true,
										postId: like.PostId, 
										userId: like.UserId,
										likeCount: likesCount[0].likeCount,
										dislikeCount: likesCount[0].dislikeCount
									})
								})
								.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
					})
					.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
				})
				.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
		}
	})
	.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
};

exports.dislikePost = (req, res, next) => {
		//  contrôle si il y a une ligne dans likes
		db.Like.findOne({
			where: {
				PostId: req.body.postId,
				UserId: req.body.userId
			}
		})
		.then(like => {
			if (!like) {
				// si il n'y avait pas dislike - création d'un dislike et retourner likeCount et dislikeCount
				// si il y avait un dislike - retourner likeCount et dislikeCount
				db.Dislike.findOrCreate({
					where: {
						PostId: req.body.postId,
						UserId: req.body.userId
					}
				})
				.then(([dislike, created]) => {
							const { QueryTypes } = require('sequelize');
							db.sequelize.query(`SELECT
								( SELECT COUNT(*) FROM likes WHERE likes.post_id =${req.body.postId} ) AS likeCount,
								( SELECT COUNT(*) FROM dislikes WHERE dislikes.post_id = ${req.body.postId} ) AS dislikeCount
							`, { type: QueryTypes.SELECT })
							.then(likesCount => {
								res.status(201).json({ 
									isCreated : created,
									isDeleted: false,
									postId: dislike.PostId, 
									userId: dislike.UserId,
									likeCount: likesCount[0].likeCount,
									dislikeCount: likesCount[0].dislikeCount
								})
							})
							.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
				})
				.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
			} else {
				// il faut supprimer like
				db.Like.destroy( {where: {id: like.id}} )
					.then(() => {
						// si il n'y avait pas dislike - création d'un dislike et retourner likeCount et dislikeCount
						// si il y avait un dislike - retourner likeCount et dislikeCount
						db.Dislike.findOrCreate({
							where: {
								PostId: req.body.postId,
								UserId: req.body.userId
							}
						})
						.then(([dislike, created]) => {
									const { QueryTypes } = require('sequelize');
									db.sequelize.query(`SELECT
										( SELECT COUNT(*) FROM likes WHERE likes.post_id =${req.body.postId} ) AS likeCount,
										( SELECT COUNT(*) FROM dislikes WHERE dislikes.post_id = ${req.body.postId} ) AS dislikeCount
									`, { type: QueryTypes.SELECT })
									.then(likesCount => {
										res.status(201).json({ 
											isCreated : created,
											isDeleted: true,
											postId: dislike.PostId, 
											userId: dislike.UserId,
											likeCount: likesCount[0].likeCount,
											dislikeCount: likesCount[0].dislikeCount
										})
									})
									.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
						})
						.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
					})
					.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
			}
		})
		.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
	
};

