require("dotenv").config();
const express = require("express");
const next = require("next");
/* const sequelize = require("./src/db/sequelize"); */ // Adjust the path as necessary
const db = require("./src/models");
/* const sequelize = require("./src/db/sequelize"); */
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  console.log("Syncing database with Sequelize models...");

  try {
    // Sync all models
    console.log("Starting Sequelize sync...");
    await db.sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Failed to synchronize the database:", error);
    process.exit(1); // Exit if DB sync fails
  }

  // Custom server logic here

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
