// API fs permet les opérations traditionnelles sue les fichiers
const fs = require('fs');
const db = require('../models');

exports.getAllUsers = (req, res, next) => {
	console.log(req.params);
	db.User.findAll(
		{
			attributes: [ ['id', 'userId'], 
								'firstname', 
								'lastname', 
								'email', 
								'photourl', 
								['isadmin', 'isAdmin'], 
								['isdeleted', 'isDeleted']]
		},
		{ order: [['lastname', 'ASC']] })
		.then(users => res.status(200).json(users))
		.catch(error => res.status(500).json({ error }))
};


exports.getOneUser = (req, res, next) => {
	const id = req.params.id;
	//db.User.findByPk(req.params.id)
	db.User.findOne({ where: { id: id } })
	.then(user => {
		 res.status(200).json({
			  userId: user.id,
			  firstname: user.firstname,
			  lastname: user.lastname,
			  email: user.email,
			  photourl: user.photourl,
			  isAdmin: user.isadmin,
			  isDeleted: user.isdeleted
		 });
	})
	.catch(error => res.status(500).json({ error: 'Erreur de la base de données' }))  
};

exports.modifyUser = (req, res, next) => {
	console.log('-------------------------dans la fonction modify');
	console.log(req.body.firstname);
	if (req.file) {
		console.log(req.file.filename);
		db.User.findByPk(req.params.id)
			.then(user => {
				if (user.photourl) {
					const filename = user.photourl.split('/images/')[1];
					// suppression de l'anciene image
					fs.unlink(`images/${filename}`, () => {
					// update de utilisateur
						db.User.update({
							firstname: req.body.firstname,
							lastname: req.body.lastname,
							email: req.body.email,
							photourl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
						}, {where: {id: req.params.id}})
							.then(() => res.status(200).json({ message: "L'utilisateur modifié !"}))
							.catch(error => res.status(400).json({ error }));
					})
				} else {
					db.User.update({
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						email: req.body.email,
						photourl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
					}, {where: {id: req.params.id}})
						.then(() => res.status(200).json({ message: "L'utilisateur modifié !"}))
						.catch(error => res.status(400).json({ error }));
				}
				

			})
			.catch(error => res.status(400).json({ error : "L'utilisateur n'est pas trouvé !" }));
	}	else {
			db.User.update({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
			}, {where: {id: req.params.id}})
				.then(() => res.status(200).json({ message: "L'utilisateur modifié !"}))
				.catch(error => res.status(400).json({ error }));	
		}
};

exports.deleteUser = (req, res, next) => {
	db.User.findByPk(req.params.id)
		.then(user => {
			if (user.photourl) {
				fs.unlink(`images/${filename}`, () => {
					user.update({
							firstname: '',
							lastname: '',
							email: '',
							password: '',
							photourl: null,
							isdeleted: true,
						},
						{ where: { id: req.params.id} } )
                .then(() => res.status(200).json({ message: "L'utilisateur supprimé !" }))
                .catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de l'utilisateur !" }));
				})
			} else {
				user.update({
					firstname: '',
					lastname: '',
					email: '',
					password: '',
					photourl: null,
					isdeleted: true,
		}, {where: {id: req.params.id}})
					.then(() => res.status(200).json({ message: "L'utilisateur supprimé !"}))
					.catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de l'utilisateur !" }));	
			} 
		})
		.catch(error => res.status(400).json({ error :"L'utilisateur n'est pas trouvé !"}));
};

exports.deleteUserByAdmin = (req, res, next) => {
	db.User.findByPk(req.params.id)
		.then(user => {
			if (user.photourl) {
				const filename = user.photourl.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
					user.destroy({ where: { id: req.params.id} })
                .then(() => res.status(200).json({ message: "L'utilisateur supprimé !" }))
                .catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de l'utilisateur !" }));
				})
			}  else {
				user.destroy({ where: { id: req.params.id} })
                .then(() => res.status(200).json({ message: "L'utilisateur supprimé !" }))
                .catch(error => res.status(400).json({ error: "Une erreur est survenu lors de suppression de l'utilisateur !" }));
			}

		})
		.catch(error => res.status(400).json({ error :"L'utilisateur n'est pas trouvé !"}));	
};

	
