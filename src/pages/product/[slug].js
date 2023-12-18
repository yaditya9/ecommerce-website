import { useRouter } from "next/router";
/* import React from "react"; */
import Image from "next/image";
import NextLink from "next/link";
import React, { useContext } from "react";
/* import Product from "../../models/Products.js";
import db from "../../models"; */
// Sequelize Product model
import axios from "axios";
import { Store } from "../../utils/Store";
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  Box,
} from "@mui/material";
import Layout from "../../components/Layout";
import data from "../../utils/data";

/* import useStyles from '../../utils/styles'; */

export default function ProductScreen({ product }) {
  const { state, dispatch } = useContext(Store);
  /* const classes = useStyles(); */
  const router = useRouter();
  const { slug } = router.query;
  /*  const product = data.products.find((a) => a.slug === slug); */
  if (!product) {
    return <Box>Product Not Found</Box>;
  }
  console.log(product);
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log(`This is product id: ${product.id}`);
    const data = await axios.get(
      `http://localhost:3000/api/products/${product.id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name} description={product.description}>
      <Box
        /* className={classes.section} */ sx={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <NextLink href="/" passHref>
          {/* <Link> */}
          <Typography color="text.primary">back to products</Typography>
          {/* </Link> */}
        </NextLink>
      </Box>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1" color="text.primary">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography color="text.primary">
                Category: {product.category}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography color="text.primary">
                Brand: {product.brand}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography color="text.primary">
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography color="text.primary">
                Description: {product.description}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid item xs={6}>
                  <Typography color="text.primary">Price</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.primary">
                    $ {product.price}
                  </Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid item xs={6}>
                  <Typography color="text.primary">Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.primary">
                    {product.countInStock > 0 ? "In stock" : "Unavailable"}
                  </Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { slug } = context.params;
  const db = await import("../../models/index.js");

  const product = await db.Product.findOne({ where: { slug } }); // Sequelize method to find one product
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product: product ? JSON.parse(JSON.stringify(product)) : null,
    },
  };
}
