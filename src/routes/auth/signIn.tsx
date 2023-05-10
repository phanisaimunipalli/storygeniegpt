import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { useValidPassword, useValidUsername } from "../../hooks/useAuthHooks";
import { Password, Username } from "../../components/authComponents";
import {
  GoogleLogin,
  useGoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { AuthContext } from "../../contexts/authContext";

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  hover: {
    "&:hover": { cursor: "pointer" },
  },
  newAccountButton: {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    "&hover": {
      backgroundColor: "red",
      background: "transparent",
    },
    centerButton: {
      textAlign: "center",
    },
  },
});

const SignIn: React.FunctionComponent<{}> = () => {
  const classes = useStyles();

  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const { password, setPassword, passwordIsValid } = useValidPassword("");
  const [error, setError] = useState("");

  const isValid =
    !usernameIsValid ||
    username.length === 0 ||
    !passwordIsValid ||
    password.length === 0;

  const history = useHistory();

  const authContext = useContext(AuthContext);

  const signInClicked = async () => {
    try {
      await authContext.signInWithEmail(username, password);
      history.push("home");
    } catch (err: any) {
      if (err.code === "UserNotConfirmedException") {
        history.push("verify");
      } else {
        setError(err.message);
      }
    }
  };

  const passwordResetClicked = async () => {
    history.push("requestcode");
  };

  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: (tokenResponse: any) => console.log(tokenResponse),
  // });

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid
        xs={11}
        sm={6}
        lg={4}
        container
        direction="row"
        justify="center"
        alignItems="center"
        item
      >
        <Paper style={{ width: "100%", padding: 32 }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {/* Title */}
            <Box m={2}>
              <Typography variant="h3">Sign in</Typography>
            </Box>
            {/* Sign In Form */}
            <Box width="80%" m={1}>
              {/* <Email emailIsValid={emailIsValid} setEmail={setEmail} /> */}
              <Username
                usernameIsValid={usernameIsValid}
                setUsername={setUsername}
              />{" "}
            </Box>
            <Box width="80%" m={1}>
              <Password
                label="Password"
                passwordIsValid={passwordIsValid}
                setPassword={setPassword}
              />
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Box onClick={passwordResetClicked} mt={2}>
                  <Typography className={classes.hover} variant="body2">
                    Forgot Password?
                  </Typography>
                </Box>
              </Grid>
            </Box>
            {/* Error */}
            <Box mt={2}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Box>
            {/* Buttons */}
            <Box mt={2}>
              <Grid container direction="row" justify="center">
                <Box m={1}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => history.goBack()}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box m={1}>
                  <Button
                    disabled={isValid}
                    color="primary"
                    variant="contained"
                    onClick={signInClicked}
                  >
                    Sign In
                  </Button>
                </Box>
              </Grid>
            </Box>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Box mt={2} mr={2}>
                <Box onClick={() => history.push("signup")}>
                  <Typography
                    className={classes.newAccountButton}
                    variant="body1"
                  >
                    Sign up with Cognito
                  </Typography>
                </Box>
              </Box>
              <Box mt={2}>
                <GoogleLogin
                  auto_select
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    history.push("/");
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
