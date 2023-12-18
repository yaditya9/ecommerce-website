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
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";
/* import Product from "../models/Products"; */ // Sequelize Product model

export default function Home(props) {
  /*  const products = props; */

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product.id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <Layout>
      <Box>
        <Typography variant="h1" color="text.primary" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={3}>
          {
            /* data. */ products.map((product) => (
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
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
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
