const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const profilRoutes = require('./routes/profil');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const cors = require('cors');

// déclaration de l'application express
const app = express();
/*
// ajout des headers pour permettre le cross origin resource sharing
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});
*/

app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: ['http://localhost:3000'],
	allowedHeaders: ['Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./models");

db.sequelize.sync();

// définition des routes

app.use("/api/auth", userRoutes);
app.use("/api/users", profilRoutes);
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes); 

 // export de l'application express
module.exports = app;