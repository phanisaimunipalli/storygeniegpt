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

import logoImage from "./storygeniee.gif";

import { AuthContext } from "../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  root: {},
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
    margin: "auto",
    maxWidth: 500,
    padding: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
    width: "400px",
  },
  submitButton: {
    fontSize: "15px",
    width: "150px",
    height: "45px",
    marginTop: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
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
    const formData = new FormData(event.currentTarget);
    const requestData = {
      theme: formData.get("theme"),
      characters: formData.get("characters"),
      tone: formData.get("tone"),
    };
    // console.log('requestData: ', requestData)
    fetch("https://ehtr2028d0.execute-api.us-east-1.amazonaws.com/stories", {
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
          <pre>Welcome {JSON.stringify(auth.attrInfo[3].Value, null, 2)}</pre>
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
      <Grid
        className={classes.root}
        container
        direction="row"
        alignItems="center"
      >
        {/* <Box className={classes.hero} p={1}> */}
        {/* <Grid className={classes.root} container direction="row" alignItems="center" justifyContent="flex-end"> */}
        {/* <pre className={classes.session}>Welcome {JSON.stringify(auth.attrInfo[3].Value, null, 2)}</pre> */}

        {/* </Grid> */}
        {/* </Box> */}
        <Box m={20}>
          <img src={logoImage} width={334} height={334} alt="logo" />
        </Box>

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
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  className={classes.input}
                  variant="outlined"
                  label="Theme"
                  name="theme"
                  value={theme}
                  required
                  onChange={(event) => setTheme(event.target.value)}
                />
                <TextField
                  className={classes.input}
                  variant="outlined"
                  label="Characters"
                  name="characters"
                  value={characters}
                  required
                  onChange={(event) => setCharacters(event.target.value)}
                />
                <TextField
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
            <Typography variant="h5">Stories List</Typography>
            <StoriesList />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
