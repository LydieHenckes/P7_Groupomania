module.exports = (sequelize, Sequelize) => {
	const PostPhoto = sequelize.define('PostPhoto', {
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
	return PostPhoto;
 };

