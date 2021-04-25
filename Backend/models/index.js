const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Post = require("./Post.js")(sequelize, Sequelize);
db.PostPhoto = require("./PostPhoto.js")(sequelize, Sequelize);
db.Like = require("./Like.js")(sequelize, Sequelize);
db.Dislike = require("./Dislike.js")(sequelize, Sequelize);
 // db.Comment = require("./Comment.js")(sequelize, Sequelize);

db.User.hasMany(db.Post, { onDelete: 'CASCADE'});
db.Post.belongsTo(db.User);
   
db.Post.hasOne(db.PostPhoto,  { onDelete: 'CASCADE' });
db.PostPhoto.belongsTo(db.Post);

db.User.hasMany(db.Like, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.Like.belongsTo(db.User);
db.Post.hasMany(db.Like, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.Like.belongsTo(db.Post, {foreignKey: {allowNull: false}});

db.User.hasMany(db.Dislike, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.Dislike.belongsTo(db.User);
db.Post.hasMany(db.Dislike, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.Dislike.belongsTo(db.Post, {foreignKey: {allowNull: false}});

/*

db.User.hasMany(db.Comment);
db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Comment.belongsTo(db.Post, { foreignKey: 'post_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
*/

module.exports = db;