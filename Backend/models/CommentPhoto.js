module.exports = (sequelize, Sequelize) => {
	const CommentPhoto = sequelize.define('CommentPhoto', {
	  id: {
		 type: Sequelize.INTEGER,
		 autoIncrement:true, 
       allowNull:false, 
       primaryKey:true
	  },
	  photourl: { 
      type: Sequelize.STRING, 
      allowNull:false
     }
	},
	{ underscored: true }
	);
	return CommentPhoto;
 };

