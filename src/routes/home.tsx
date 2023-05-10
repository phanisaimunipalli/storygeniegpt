import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StoriesList from "./StoriesList";
import React, { useContext, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import VideoPlayer from "./VideoPlayer";
import logoImage from "./storygeniee.gif";

import { AuthContext } from "../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  "@global": {
    "@font-face": {
      fontFamily: "Open Sans",
      fontStyle: "normal",
      fontWeight: 400,
      src: "url(https://fonts.googleapis.com/css?family=Open+Sans:400&display=swap)",
    },
  },
  palette: {
    primary: {
      main: "#E33E7F",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "70px",
    maxWidth: 500,
    padding: theme.spacing(4),
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0 0 30px 10px rgba(255, 255, 255, 0.3)",
    textAlign: "center",
  },
  input: {
    marginBottom: theme.spacing(2),
    borderColor: "white",
    border: "1px solid red",
    width: "400px",
    color: "white",
    "&::placeholder": {
      color: "gray",
    },
  },

  label: {
    marginBottom: theme.spacing(2),
    width: "400px",
    color: "black",
    border: "1px solid white",
    padding: "10px",
  },
  submitButton: {
    fontSize: "15px",
    width: "150px",
    height: "45px",
    marginTop: theme.spacing(2),
    alignSelf: "center",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    color: "white",
  },
  session: {
    width: "80vw",
    overflow: "auto",
    overflowWrap: "break-word",
    fontSize: "16px",
  },
  hero: {
    width: "100%",
    background: "rgb(220,220,220)",
    height: "10px",
  },
  preStyle: {
    color: "white",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState("generate");
  const [theme, setTheme] = useState("");
  const [characters, setCharacters] = useState("");
  const [tone, setTone] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    theme: "",
    characters: "",
    tone: "",
  });

  const history = useHistory();

  const auth = useContext(AuthContext);

  function signOutClicked() {
    auth.signOut();
    history.push("/");
  }

  function changePasswordClicked() {
    history.push("changepassword");
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const API_URL = process.env.REACT_APP_API_URL;
    const formData = new FormData(event.currentTarget);
    const requestData = {
      theme: formData.get("theme"),
      characters: formData.get("characters"),
      tone: formData.get("tone"),
    };
    // console.log('requestData: ', requestData)
    fetch(`${API_URL}`, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Generated story:", data);
        setGeneratedStory(data.story);
        setIsLoading(false);
        setActiveTab("storiesList");
      })
      .catch((error) => {
        console.error("Error generating story:", error);
        setGeneratedStory("");
        setIsLoading(false);
      });
  }

  return (
    <Grid container>
      <Grid container direction="row" justifyContent="flex-end">
        <Box m={1}>
          {auth.attrInfo[3] && (
            <pre className={classes.preStyle}>
              Welcome {JSON.stringify(auth.attrInfo[3].Value, null, 2)}
            </pre>
          )}
        </Box>

        <Box m={1}>
          <Button
            onClick={() => setActiveTab("generate")}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#009AEE",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Generate Story
          </Button>
        </Box>
        <Box m={1}>
          <Button
            onClick={() => setActiveTab("list")}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#009AEE",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            List Stories
          </Button>
        </Box>
        <Box m={1}>
          <Button
            onClick={changePasswordClicked}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#009AEE",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Change Password
          </Button>
        </Box>
        <Box m={1}>
          <Button
            onClick={signOutClicked}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#8B4000",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Grid>
      {/* <Box m={1}>
        <img src={logoImage} width={334} height={334} alt="logo" />
      </Box> */}
      <Grid
        className={classes.root}
        container
        direction="column"
        alignItems="center"
      >
        {isLoading ? (
          <Box m={2}>
            <CircularProgress />
          </Box>
        ) : activeTab === "generate" ? (
          <Card className={classes.form}>
            <CardContent>
              <Typography className={classes.title} variant="h5" component="h2">
                Generate Story
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  InputLabelProps={{
                    style: { color: "white", borderBlockColor: "white" },
                  }}
                  InputProps={{
                    style: { color: "white", borderBlockColor: "white" },
                  }}
                  className={classes.input}
                  placeholder="Write your theme"
                  variant="outlined"
                  label="Theme"
                  name="theme"
                  value={theme}
                  required
                  onChange={(event) => setTheme(event.target.value)}
                />
                <TextField
                  InputLabelProps={{
                    style: { color: "white", borderBlockColor: "white" },
                  }}
                  InputProps={{
                    style: { color: "white", borderBlockColor: "white" },
                  }}
                  className={classes.input}
                  variant="outlined"
                  label="Characters"
                  name="characters"
                  value={characters}
                  required
                  onChange={(event) => setCharacters(event.target.value)}
                />
                <TextField
                  InputLabelProps={{
                    style: { color: "white", borderBlockColor: "white" },
                  }}
                  InputProps={{
                    style: { color: "white", borderBlockColor: "white" },
                  }}
                  className={classes.input}
                  variant="outlined"
                  name="tone"
                  label="Tone"
                  value={tone}
                  required
                  onChange={(event) => setTone(event.target.value)}
                />
                <Button
                  className={classes.submitButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{
                    backgroundColor: "#009AEE",
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Do the Magic!
                </Button>
              </form>
              {generatedStory && (
                <Box mt={4}>
                  <Typography variant="body1">{generatedStory}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ) : (
          <Box m={2}>
            <Typography variant="h5">Once upon a time...</Typography>
            <StoriesList />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
