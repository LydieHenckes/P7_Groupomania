module.exports = (sequelize, Sequelize) => {
	const Post = sequelize.define('Post', {
	  id: {
		 type: Sequelize.INTEGER,
		 autoIncrement:true, 
       allowNull:false, 
       primaryKey:true
	  },
	  content: { 
      type: Sequelize.TEXT, 
      allowNull:false
     }, 
	  isdeleted: { 
      type: Sequelize.BOOLEAN, 
		defaultValue: false,
      allowNull:false
     }
	},
	{ underscored: true }
	);
	return Post;
 };

