/* import React, { Children } from "react"; */
import React, { useContext } from "react";
import Head from "next/head";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Link,
  CssBaseline,
  Switch,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import NextLink from "next/link";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      text: {
        primary: darkMode ? "#f0c000" : "#000000", // Example colors for dark and light modes
        secondary: darkMode ? "#c7c7c7" : "#555555", // Lighter text for dark mode, darker text for light mode
      },
      primary: {
        main: "#f0c000",
        background: {
          default: darkMode ? "#303030" : "#ffffff", // Example colors for dark and light modes
        },
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Head>
        <title>zonama</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#203040",
            "& a": { color: "#ffffff", marginLeft: 2 },
          }}
        >
          <Toolbar>
            <NextLink href="/" passHref>
              {/* <Link sx={{ textDecoration: "none" }}> */}
              <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                zonama
              </Typography>
              {/* </Link> */}
            </NextLink>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                {/* <Link sx={{ textDecoration: "none" }}> */}Cart
                {/* </Link> */}
              </NextLink>
              <NextLink href="/login" passHref>
                {/* <Link sx={{ textDecoration: "none" }}> */}Login
                {/* </Link> */}
              </NextLink>
            </Box>
          </Toolbar>
        </AppBar>
        <Container sx={{ minHeight: "80vh" }}>{children}</Container>
        <Box component="footer" sx={{ textAlign: "center", mt: 10 }}>
          <Typography color="text.primary">
            All rights reserved. Yuxian Xu ecommerce shopping store.
          </Typography>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

/* export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>zonama</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>zonama</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>
          All rights reserved. Yuxian Xu ecommerce shopping store.
        </Typography>
      </footer>
    </div>
  ); 
} */
