import React from "react";
import "./App.css";

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import AuthProvider, {
  AuthIsSignedIn,
  AuthIsNotSignedIn,
} from "./contexts/authContext";

import SignIn from "./routes/auth/signIn";
import SignUp from "./routes/auth/signUp";
import VerifyCode from "./routes/auth/verify";
import RequestCode from "./routes/auth/requestCode";
import ForgotPassword from "./routes/auth/forgotPassword";
import ChangePassword from "./routes/auth/changePassword";
import Landing from "./routes/landing";
import Home from "./routes/home";
import VideoPlayer from "./routes/VideoPlayer";

let lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});
lightTheme = responsiveFontSizes(lightTheme);

const useStyles = makeStyles((theme) => ({
  videoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    overflow: "hidden",
    "& video": {
      width: "100%",
      height: "100vh",
      objectFit: "cover",
    },
  },
}));

// let darkTheme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   },
// })
// darkTheme = responsiveFontSizes(darkTheme)

const SignInRoute: React.FunctionComponent = () => (
  <Router>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/verify" component={VerifyCode} />
      <Route path="/requestcode" component={RequestCode} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/" component={Landing} />
    </Switch>
  </Router>
);

const MainRoute: React.FunctionComponent = () => (
  <Router>
    <Switch>
      <Route path="/changepassword" component={ChangePassword} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <AuthIsSignedIn>
          <div className={classes.videoContainer}>
            <VideoPlayer src="nightsky.mp4" loop muted autoPlay />
          </div>
          <MainRoute />
        </AuthIsSignedIn>
        <AuthIsNotSignedIn>
          <SignInRoute />
        </AuthIsNotSignedIn>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
