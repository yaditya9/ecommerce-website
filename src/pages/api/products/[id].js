/* import Product from "../../../models/Product"; */
import db from "../../../models/index"; // Adjust the path to your db connection utility

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    /*  await db.sequelize.sync({ alter: true });  */ // Sync database if needed
    const product = await db.Product.findByPk(id); // Replace with the appropriate method to find by ID

    if (product) {
      res.json(product); // Send the found product
      console.log("Data fetched");
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

/* import nc from "next-connect";
import Product from "../../../models/Products";
import db from "../../../models/index"; // Adjust the path to your db connection utility

const handler = nc();

handler.get(async (req, res) => {
  const { id } = req.query;
  try {
    // Replace with your database connection logic if different
    await db.connect();
    const product = await db.Product.findByPk(id);
    res.json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await db.disconnect();
  }
});

export default handler;
 */
