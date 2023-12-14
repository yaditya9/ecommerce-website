import nc from "next-connect";
import Product from "../../../models/Product";
import sequelize from "../../../db/sequelize"; // Path to your Sequelize instance

const handler = nc();

handler.get(async (req, res) => {
  try {
    await sequelize.authenticate(); // Connect to the database
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default handler;
