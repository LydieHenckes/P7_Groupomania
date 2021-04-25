module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('User', {
	  id: {
		 type: Sequelize.INTEGER,
		 autoIncrement:true, 
       allowNull:false, 
       primaryKey:true
	  },
	  firstname: { 
      type: Sequelize.STRING, 
      allowNull:false
     }, 
	  lastname: { 
      type: Sequelize.STRING, 
      allowNull:false
     }, 
	  email: { 
      type: Sequelize.STRING, 
      allowNull:false,
  		unique: true
     }, 
	  password: {
      type: Sequelize.STRING,
      allowNull: false
    },
	 photourl: {
      type: Sequelize.STRING
   },
	 isadmin: {
      type: Sequelize.BOOLEAN,
		  defaultValue: false,
      allowNull: false
   },

    isdeleted :  {
      type :Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
 	},
  { underscored: true }
  );
 	return User;
};

