import React from "react";

import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import { colors } from "@material-ui/core";

// import logoImage from "./story.png";

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import VideoPlayer from "./VideoPlayer";
// import bedtimeStoriesVideo from "./nightsky.mp4";
import logoImage from "./logo.png";
import backgroundImage from "./moonstory.gif";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  videoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  contentContainer: {
    position: "relative",
    zIndex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "400px",
  },
  brandName: {
    color: "white",
    fontSize: "48px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    marginBottom: theme.spacing(2),
  },
  imageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "400px",
    height: "auto",
    marginBottom: theme.spacing(2),
  },
  button: {
    width: "250px",
    height: "50px",
    fontSize: "17px",
    backgroundColor: "#009AEE",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
}));

const Landing: React.FunctionComponent = () => {
  const classes = useStyles();

  const history = useHistory();

  const signIn = () => {
    history.push("/signin");
  };

  return (
    <div className={classes.root}>
      <div className={classes.videoContainer}>
        <VideoPlayer
          src="nightsky.mp4"
          className={classes.video}
          loop
          muted
          autoPlay
        />
      </div>
      <div className={classes.contentContainer}>
        <img src={backgroundImage} alt="logo" className={classes.logo} />
        <Typography variant="h1" className={classes.brandName}>
          Story Genie
        </Typography>
        <div className={classes.imageContainer}>
          {/* <img
            src={backgroundImage}
            alt="background"
            className={classes.image}
          /> */}
          <Button
            onClick={signIn}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Experience the Magic!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
