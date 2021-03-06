/* Logique métier pour users*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const db = require('../models');

const User = require('../models/User');

//logique métier pour la route Post /signup (inscription)
exports.signup = (req, res, next) => {
	// contrôle des champs de requête: email, firstname et lastname

	if (!validator.isEmail(req.body.email)) {
		return res.status(401).json({error: "Email n'est pas valide !"});
	}
	if (!validator.isAlpha(req.body.firstname)) {
		return res.status(401).json({error: "Prénom n'est pas valide !"});
	}
	if (!validator.isAlpha(req.body.lastname)) {
		return res.status(401).json({error: "Prénom n'est pas valide !"});
	}

	// cryptage du mot de passe
	bcrypt.hash(req.body.password, 10)
	  .then(hash => {
	//		console.log("isAdmin--------------------------------- : ", req.body.isAdmin);
			db.User.create ({
				email: req.body.email,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				password: hash,
				isadmin : req.body.isAdmin
			})
			.then(user => {
				console.log("user: ", user.id, user.firstname);
				res.status(201).json({
					userId : user.id,
					firstName: user.firstname,
					lastName: user.lastname,
					isAdmin: user.isadmin,
					isDeleted: user.isdeleted,
					photourl: user.photourl,
					token: jwt.sign(
						{ userId: user.id,
						  isadmin: user.isadmin,
						},
						'az8K56GTF712dpB',
						{ expiresIn: '24h' }
					 )
			  })
			})
			.catch(error => {
				console.log('Error numéro 1');
				res.status(400).json({ error });
			}  );
			
	  })
	  .catch(error => res.status(500).json({ error }));
 };



 // logique métier pour la route Post /login (connection)
 exports.login = (req, res, next) => {
	if (!validator.isEmail(req.body.email)) {
		return res.status(401).json({error: "Email n'est pas valide !"});
	}
	 // recherche d'utilisateur par son email
	 db.User.findOne({
		where: {
		  email: req.body.email
		}
	 })	
	  .then(user => {
		  // si il n'y a pas d'utilisateur avec cet email
		 if (!user) {
			return res.status(404).json({ error: 'Utilisateur non trouvé ou le mot de passe incorrect!' });
		 }

		 // comparaison des hash de nouveau mot de passe, avec hash du mot de passe dans la base
		 bcrypt.compare(req.body.password, user.password)
			.then(valid => {
			  if (!valid) {
				 return res.status(401).json({ error: 'Utilisateur non trouvé ou le mot de passe incorrect!' });
			  }
			  // si les hashs provient du même mot de passe, envoie du userId et token comme cookie
			  const token =  jwt.sign(
				{ userId: user.id,
				  isadmin: user.isadmin,
				},
				'az8K56GTF712dpB',
				{ expiresIn: '24h' }
			 );

			  res.cookie('jwt', token, { httpOnly: true, maxAge : 24 * 60 * 60 * 1000});
			  res.status(200).json({
				 userId: user.id,
				 firstName: user.firstname, 
				 lastName: user.lastname,
				 isAdmin: user.isadmin,
				 isDeleted: user.isdeleted,
				 photourl: user.photourl,
				 token: token // это можно не отсылать
			  });
			})
			.catch(error => res.status(500).json({ error: '1' }));
	  })
	  .catch(error => res.status(500).json({ error }));
 };

 
 // logique métier pour la route user (authentification d'utilisateur)
 exports.user = async (req, res, next) => {
	try {
		const cookie = req.cookies['jwt'];

		const claims = jwt.verify(cookie, 'az8K56GTF712dpB');
		if (!claims) {
			return res.status(401).json({ error: 'unauthenticated' });
		};
		db.User.findOne({
			where: {
			  id: claims.userId
			}
		 })
		 .then(user => {
			if (!user) {
				return res.status(404).json({ error: 'Utilisateur non trouvé ou le mot de passe incorrect!' });
			 }
			 res.status(200).json({
				userId: user.id,
				firstName: user.firstname,
				lastName: user.lastname,
				isAdmin: user.isadmin,
				isDeleted: user.isdeleted,
				photourl: user.photourl,
			 });
		 })
		 .catch(error =>  res.status(404).json({ error: 'Utilisateur non trouvé ou le mot de passe incorrect!' }));

	 } catch {
		res.status(401).json({ error: 'unauthenticated' });
	 }
 };

 exports.logout = (req, res, next) => {
	 
	 res.cookie('jwt', '', {maxAge: 0});
	 res.send({message: 'success'});
 };
