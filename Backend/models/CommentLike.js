module.exports = (sequelize, Sequelize) => {
	const CommentLike = sequelize.define('CommentLike', {
	  id: {
		 type: Sequelize.INTEGER,
		 autoIncrement:true, 
       allowNull:false, 
       primaryKey:true
	  },
	},
	{ underscored: true }
	);
	return CommentLike;
 };

