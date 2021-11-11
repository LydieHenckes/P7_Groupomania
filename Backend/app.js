const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const profilRoutes = require('./routes/profil');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const cors = require('cors');

// Sécurité
const helmet = require("helmet");   
const hpp = require("hpp"); 
const rateLimit = require('express-rate-limit');
const toobusy = require('toobusy-js');

const path = require('path');

// déclaration de l'application express
const app = express();

app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: ['http://localhost:3000'], //true, 
	allowedHeaders: ['Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))
// helmet aide à sécuriser les applications Express en définissant divers en-têtes HTTP 11 middlewares
app.use(helmet());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  pour se protéger contre les attaques de pollution des paramètres HTTP)
app.use(hpp());

// utilisation express-rate-limiter pour le nombre max de tentatives de connexion
const apiLimiter = rateLimit({
	windowMs: 2*60*1000, // 2 minutes
	max: 10,
	message: 'Vous avez dépassé le nombre de tentatives de connecxion, réessayez plus tard !'
 });
  // on applique uniquement pour les requêtes d'authéntification
 app.use('/api/auth', apiLimiter);

 //Limitation du nombre maximal de requêtes
const reqLimiter = rateLimit({
	windowMs : 5 * 60 * 1000, 
	max: 300, 
	message: "Vous avez dépassé le nombre maximal de requêtes, réessayez ultérieurement."
});

// utilisation de toobusy-js : si le serveur est trop occupé, envoie la réponse, sans traîter la requête, car cela peut être une attaque DoS
app.use(function(req, res, next) {
	if (toobusy()) {
		 res.send(503, "Server Too Busy");
	} else {
		next();
	}
});


//application pour les routes posts et comments
app.use('/api/posts', reqLimiter);
app.use('/api/comments', reqLimiter);





const db = require("./models");

db.sequelize.sync();

// définition des routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);
app.use("/api/users", profilRoutes);
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes); 

 // export de l'application express
module.exports = app;