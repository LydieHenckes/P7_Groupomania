module.exports = (sequelize, Sequelize) => {
	const Dislike = sequelize.define('Dislike', {
	  id: {
		 type: Sequelize.INTEGER,
		 autoIncrement:true, 
       allowNull:false, 
       primaryKey:true
	  },
	},
	{ underscored: true }
	);
	return Dislike;
 };

