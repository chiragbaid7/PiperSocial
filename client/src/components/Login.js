import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useHistory } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const history = useHistory();

  function checkloginstate() {
    const userlogedin = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (userlogedin) {
      //home page after login
      setname(name);
      setuser(true);
    }
  }
  useEffect(() => {
    checkloginstate();
  }, []);

  const classes = useStyles();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState(false);
  const [name, setname] = useState("");
  const [error, errorstate] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await axios.post(
        "https://pipersocial.herokuapp.com/api/auth/login",
        body,
        { withCredentials: true, credentials: "include" }
      );
      //set the state of the user
      //store the user in localstorage
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("user_id", response.data.userid);
      localStorage.setItem("token", response.data.token);
      checkloginstate();
    } catch (error) {
      const message = error.response.data.message;
      errorstate(message);
    }
  };
  if (user) {
    //Home page component
    history.push("/home");
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handlesubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={({ target }) => setemail(target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={({ target }) => setpassword(target.value)}
          />
          {error && <h4 style={{ color: "red" }}>{error}</h4>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
