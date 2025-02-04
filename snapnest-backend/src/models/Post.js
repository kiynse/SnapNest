const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Category = require("./Category");

// Modelo de Post
const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING, // URL da imagem
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Relacionamento entre Post e User (Um Post pertence a um User)
Post.belongsTo(User, { foreignKey: "userId", as: "author" });

// Relacionamento muitos para muitos entre Post e Category
Post.belongsToMany(Category, { through: "PostCategories", foreignKey: "postId", as: "categories" });

User.hasMany(Post, { foreignKey: "userId" });

// Relacionamento muitos para muitos entre Post e Category
Category.belongsToMany(Post, { through: "PostCategories", foreignKey: "categoryId", as: "posts" });

module.exports = Post;
