import Product from "../../models/Products"; // Adjust the path as necessary
import sequelize from "../../db/sequelize"; // Path to your Sequelize instance
import data from "../../utils/data";
import db from "../../models/index";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await sequelize.sync({ force: true }); // Sync and force recreate tables
      await db.Product.bulkCreate(data.products); // Seed the Product table
      res.status(200).json({ message: "Seeded successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

/* import nc from "next-connect";
import Product from "../../models/Products";
import sequelize from "../../db/sequelize"; // Path to your Sequelize instance
import data from "../../utils/data";
import db from "../../models/index";
const handler = nc();

handler.get(async (req, res) => {
  try {
    await sequelize.sync({ alter: true }); // Sync database
    await Product.bulkCreate(data.products);
    res.send({ message: "seeded successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default handler; */
