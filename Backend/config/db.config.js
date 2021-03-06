const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	HOST: "localhost",
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASS,
	DB: process.env.DB_DATABASE,
	dialect: "mysql",
	pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
	}
 };