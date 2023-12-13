import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import NextLink from "next/link";
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

export default function ProductScreen() {
  /* const classes = useStyles(); */
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <Box>Product Not Found</Box>;
  }
  return (
    <Layout title={product.name} description={product.description}>
      <Box
        /* className={classes.section} */ sx={{
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {/* <NextLink href="/" passHref>
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink> */}
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
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid item xs={6}>
                  <Typography>Price</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>$ {product.price}</Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid item xs={6}>
                  <Typography>Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {product.countInStock > 0 ? "In stock" : "Unavailable"}
                  </Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary">
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
