import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import Layout from "../components/Layout";
import data from "../utils/data";
import NextLink from "next/link";
/* import Product from "../models/Products"; */ // Sequelize Product model

export default function Home(props) {
  const products = props;
  return (
    <Layout>
      <Box>
        <Typography variant="h1" color="text.primary" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={3}>
          {data.products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary">
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  /*  const { db } from "../models"; */
  const db = await import("../models/index.js");
  const products = await db.Product.findAll(); // Sequelize method to get all products

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)), // Convert Sequelize objects to plain objects
    },
  };
}
