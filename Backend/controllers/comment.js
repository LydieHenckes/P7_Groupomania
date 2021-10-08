// API fs permet les opérations traditionnelles sue les fichiers
const fs = require('fs');
const db = require('../models');


exports.getCommentsByPostId = (req, res, next) => {
 // req.params.id
 const { QueryTypes } = require('sequelize');
	
 db.sequelize.query(`SELECT comments.id AS commentId, content, 
 comments.isdeleted AS commentIsDeleted, 
 comments.created_at AS createdAt, comments.updated_at AS updatedAt, 
 user_id AS userId, users.lastname, 
 users.firstname, users.email, users.photourl AS userPhotourl,
 users.isdeleted AS userIsDeleted, 
 comment_photos.photourl,
  ( SELECT COUNT(*)
		FROM comment_likes
		WHERE
			 comment_likes.comment_id = comments.id
  ) AS commentlikeCount,
  ( SELECT COUNT(*)
		FROM comment_dislikes
		WHERE
			 comment_dislikes.comment_id = comments.id
  ) AS commentdislikeCount
 FROM comments
 left join comment_photos on comment_photos.comment_id = comments.id 
 left join users on users.id = comments.user_id 
 where comments.post_id = ${req.params.id}`, { type: QueryTypes.SELECT })
 .then(comments => {
	 res.status(200).json(comments)
 })
 .catch(error => res.status(500).json({ error:"Erreur de la base de données" }));

};

exports.createComment = (req, res, next) => {
	db.User.findOne({ where: { id: req.body.userId } })
 	 .then(user => {
			db.Post.findOne({ where: { id: req.body.postId } })
			 .then(post => {
				 db.Comment.create({
					UserId: user.id,  
               content: req.body.content,
					PostId: post.id
            })
				.then(comment => {
					
					if (1) {	//(req.file)
						const filename = 'filename';
						//`${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
						db.CommentPhoto.create({
							CommentId: comment.id,
							photourl: filename,
						})
						.then(commentPhoto => {
							res.status(201).json({ 
								commentId: comment.id,
								content: comment.content,
								commentIsDeleted: comment.isdeleted,
								createdAt: comment.createdAt,
								updatedAt : comment.updatedAt,
								userId: comment.UserId,
								postId: comment.PostId,
								photourl: commentPhoto.photourl,
							})
						})
						.catch(error => res.status(500).json({ error:"Erreur de la base de données ! " + error }));
					} else {
						res.status(201).json({ 
							commentId: comment.id,
							content: comment.content,
							commentIsDeleted: comment.isdeleted,
							createdAt: comment.createdAt,
							updatedAt : comment.updatedAt,
							userId: comment.UserId,
							postId: comment.PostId,
						})
					}
				})
				.catch(error => res.status(500).json({ error:"Erreur de la ctéation de commentaire !" }));
			  })
			 .catch(error => res.status(500).json({ error:"Erreur de la base de données !" }));
		})
	 .catch(error => res.status(500).json({ error:"Erreur de la base de données !" }));
};

exports.deleteComment = (req, res, next) => {
	db.Comment.findByPk(req.params.id)
	.then(comment => {
		if (!comment) {
			res.status(400).json({ error: "Comment n'existe pas !" })
		} else {
			// если есть к посту картинка- удалить
			db.CommentPhoto.findOne({ where: { comment_id: req.params.id} })
			.then(commentPhoto => {
				comment.destroy({ where: { id: req.params.id} })
					.then(() => res.status(200).json({ message: "Comment supprimé !" }))
					.catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de comment !" }));
	/*  // changer si il y a des vrais images
			if (commentPhoto) {
				const filename = commentPhoto.photourl.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
					// supprimer comment
					comment.destroy({ where: { id: req.params.id} })
					.then(() => res.status(200).json({ message: "Comment supprimé !" }))
					.catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de comment !" }));
				})
				} else {
					comment.destroy({ where: { id: req.params.id} })
					.then(() => res.status(200).json({ message: "Comment supprimé !" }))
					.catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de comment !" }));
				}
				*/
			})
			.catch(error => res.status(400).json({ error :"L'erreur de la base de données !"}));
		}
	})
	.catch(error => res.status(400).json({ error :"L'erreur de la base de données !"})); 
};

//like d'un comment
exports.likeComment = (req, res, next) => {

	// ajouter contrôle si il y a une ligne dans dislikes
	db.CommentDislike.findOne({
		where: {
			CommentId: req.body.commentId,
			UserId: req.body.userId
		}
	})
	.then(commentdislike => {
		if (!commentdislike) {
			// si il n'y avait pas dislike - création d'un like et retourner likeCount et dislikeCount
			// si il y avait un like - retourner likeCount et dislikeCount
			db.CommentLike.findOrCreate({
				where: {
					CommentId: req.body.commentId,
					UserId: req.body.userId
				}
			})
			.then(([commentlike, created]) => {
						const { QueryTypes } = require('sequelize');
						db.sequelize.query(`SELECT
							( SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id =${req.body.commentId} ) AS commentlikeCount,
							( SELECT COUNT(*) FROM comment_dislikes WHERE comment_dislikes.comment_id = ${req.body.commentId} ) AS commentdislikeCount
						`, { type: QueryTypes.SELECT })
						.then(commentlikesCount => {
							res.status(201).json({ 
								isCreated : created,
								isDeleted: false,
								commentId: commentlike.CommentId, 
								userId: commentlike.UserId,
								commentlikeCount: commentlikesCount[0].commentlikeCount,
								commentdislikeCount: commentlikesCount[0].commentdislikeCount
							})
						})
						.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
			})
			.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
		} else {
			// il faut supprimer dislike
			db.CommentDislike.destroy( {where: {id: commentdislike.id}} )
				.then(() => {
					// si il n'y avait pas dislike - création d'un like et retourner likeCount et dislikeCount
					// si il y avait un like - retourner likeCount et dislikeCount
					db.CommentLike.findOrCreate({
						where: {
							CommentId: req.body.commentId,
							UserId: req.body.userId
						}
					})
					.then(([commentlike, created]) => {
								console.log('----**********************-------------------');
								const { QueryTypes } = require('sequelize');
								db.sequelize.query(`SELECT
									( SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id =${req.body.commentId} ) AS commentlikeCount,
									( SELECT COUNT(*) FROM comment_dislikes WHERE comment_dislikes.comment_id = ${req.body.commentId} ) AS commentdislikeCount
								`, { type: QueryTypes.SELECT })
								.then(commentlikesCount => {

									res.status(201).json({ 
										isCreated : created,
										isDeleted: true,
										commentId: commentlike.CommentId, 
										userId: commentlike.UserId,
										commentlikeCount: commentlikesCount[0].commentlikeCount,
										commentdislikeCount: commentlikesCount[0].commentdislikeCount
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

//dislike d'un comment
exports.dislikeComment = (req, res, next) => {

		//  contrôle si il y a une ligne dans likes
		db.CommentLike.findOne({
			where: {
				CommentId: req.body.commentId,
				UserId: req.body.userId
			}
		})
		.then(commentlike => {
			if (!commentlike) {
				// si il n'y avait pas dislike - création d'un dislike et retourner likeCount et dislikeCount
				// si il y avait un dislike - retourner likeCount et dislikeCount
				db.CommentDislike.findOrCreate({
					where: {
						CommentId: req.body.commentId,
						UserId: req.body.userId
					}
				})
				.then(([commentdislike, created]) => {
							const { QueryTypes } = require('sequelize');
							db.sequelize.query(`SELECT
								( SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id =${req.body.commentId} ) AS commentlikeCount,
								( SELECT COUNT(*) FROM comment_dislikes WHERE comment_dislikes.comment_id = ${req.body.commentId} ) AS commentdislikeCount
							`, { type: QueryTypes.SELECT })
							.then(commentlikesCount => {
								res.status(201).json({ 
									isCreated : created,
									isDeleted: false,
									commentId: commentdislike.CommentId, 
									userId: commentdislike.UserId,
									commentlikeCount: commentlikesCount[0].commentlikeCount,
									commentdislikeCount: commentlikesCount[0].commentdislikeCount
								})
							})
							.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
				})
				.catch(error => res.status(500).json({ error:"Erreur de la base de données" }));
			} else {
				// il faut supprimer like
				db.CommentLike.destroy( {where: {id: commentlike.id}} )
					.then(() => {
						// si il n'y avait pas dislike - création d'un dislike et retourner likeCount et dislikeCount
						// si il y avait un dislike - retourner likeCount et dislikeCount
						db.CommentDislike.findOrCreate({
							where: {
								CommentId: req.body.commentId,
								UserId: req.body.userId
							}
						})
						.then(([commentdislike, created]) => {
									const { QueryTypes } = require('sequelize');
									db.sequelize.query(`SELECT
										( SELECT COUNT(*) FROM comment_likes WHERE comment_likes.comment_id =${req.body.commentId} ) AS commentlikeCount,
										( SELECT COUNT(*) FROM comment_dislikes WHERE comment_dislikes.comment_id = ${req.body.commentId} ) AS commentdislikeCount
									`, { type: QueryTypes.SELECT })
									.then(commentlikesCount => {
										res.status(201).json({ 
											isCreated : created,
											isDeleted: true,
											commentId: commentdislike.CommentId, 
											userId: commentdislike.UserId,
											commentlikeCount: commentlikesCount[0].commentlikeCount,
											commentdislikeCount: commentlikesCount[0].commentdislikeCount
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


