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

db.Comment = require("./Comment.js")(sequelize, Sequelize);
db.CommentPhoto = require("./CommentPhoto.js")(sequelize, Sequelize);
db.CommentLike = require("./CommentLike.js")(sequelize, Sequelize);
db.CommentDislike = require("./CommentDislike.js")(sequelize, Sequelize);

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

db.User.hasMany(db.Comment, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.Comment.belongsTo(db.User, {foreignKey: {allowNull: false}});
db.Post.hasMany(db.Comment, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.Comment.belongsTo(db.Post, {foreignKey: {allowNull: false}});

db.Comment.hasOne(db.CommentPhoto, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.CommentPhoto.belongsTo(db.Comment, {foreignKey: {allowNull: false}});

db.User.hasMany(db.CommentLike, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.CommentLike.belongsTo(db.User);
db.Comment.hasMany(db.CommentLike, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.CommentLike.belongsTo(db.Comment, {foreignKey: {allowNull: false}});

db.User.hasMany(db.CommentDislike, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.CommentDislike.belongsTo(db.User);
db.Comment.hasMany(db.CommentDislike, {foreignKey: {allowNull: false},  onDelete: 'CASCADE'});
db.CommentDislike.belongsTo(db.Comment, {foreignKey: {allowNull: false}});

module.exports = db;