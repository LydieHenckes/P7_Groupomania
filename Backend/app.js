const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// déclaration de l'application express
const app = express();

// ajout des headers pour permettre le cross origin resource sharing
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// définition des routes
app.get("/", (req, res) => {
	res.json({ message: "Welcome to groupomania application." });
 });

 // export de l'application express
module.exports = app;