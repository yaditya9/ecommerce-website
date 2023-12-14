const { DataTypes } = require("sequelize");
/* const sequelize = require("../db/sequelize"); // Path to your Sequelize instance
const db = require("./index"); */
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      category: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      brand: { type: DataTypes.STRING, allowNull: false },
      rating: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 },
      numReviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      countInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      description: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      tableName: "Products",
      freezeTableName: true,
    }
  );

  return Product;
};

/* const Product = sequelize.define(
  "Product",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    category: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 },
    numReviews: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    description: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "Product",
    freezeTableName: true,
  },
  {
    timestamps: true, // Sequelize adds createdAt and updatedAt by default
  }
);

module.exports = Product;
 */
