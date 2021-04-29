module.exports = (sequelize, Sequelize) => {
	const CommentDislike = sequelize.define('CommentDislike', {
	  id: {
		 type: Sequelize.INTEGER,
		 autoIncrement:true, 
       allowNull:false, 
       primaryKey:true
	  },
	},
	{ underscored: true }
	);
	return CommentDislike;
 };

