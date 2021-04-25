module.exports = (sequelize, Sequelize) => {
	const Comment = sequelize.define('Comment', {
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
	});
 
	return Comment;
 };

