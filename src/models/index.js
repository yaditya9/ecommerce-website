const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:test1324@localhost:5432/EcomWebsite"
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Product = require("./Products")(sequelize, DataTypes);

// Initialize Sequelize

// Authenticate and log the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Define models

// Import model definitions

// Sync all models
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Failed to synchronize the database:", error);
  });

module.exports = db;
