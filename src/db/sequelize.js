const { Sequelize, DataTypes } = require("sequelize");
console.log("Database URL:", process.env.POSTGRES_URI);
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
}); // Your PostgreSQL connection string

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the PostgreSQL database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the PostgreSQL database:", err);
  });

module.exports = sequelize;

/* const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URI); // Replace with your PostgreSQL connection string

module.exports = sequelize; */
