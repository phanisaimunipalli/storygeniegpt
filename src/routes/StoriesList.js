import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AWS from "aws-sdk";

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

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 500,
    padding: theme.spacing(4),
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0 0 30px 10px rgba(255, 255, 255, 0.3)",
  },

  submitButton: {
    color: "white",
    fontSize: "15px",
    width: "150px",
    height: "45px",
    marginTop: theme.spacing(2),
    alignSelf: "center",
    textTransform: "none",
    border: "2px solid white",
    borderRadius: "25px",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.3)",
    "&:hover": {
      backgroundColor: "white",
      color: "black",

      transform: "scale(1.1)",
    },
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    color: "white",
  },
}));

export default function StoriesList() {
  const classes = useStyles();
  const [stories, setStories] = useState([]);
  const [polly, setPolly] = useState(null);

  useEffect(() => {
    axios
      .get("https://ehtr2028d0.execute-api.us-east-1.amazonaws.com/stories")
      .then((response) => {
        // console.log('response.data: ', response.data)
        setStories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Initialize Polly object
    const polly = new AWS.Polly({
      region: "us-east-1",
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    setPolly(polly);
  }, []);

  const handleReadMoreClicked = (text) => {
    // Synthesize speech using Polly
    polly.synthesizeSpeech(
      {
        OutputFormat: "mp3",
        Text: text,
        VoiceId: "Kevin",
        Engine: "neural",
      },
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log('data: ', data)
        const audioBlob = new Blob([data.AudioStream], { type: "audio/mp3" });
        const audioUrl = window.URL.createObjectURL(audioBlob);
        // console.log('audioUrl: ', audioUrl)
        const audio = new Audio();
        audio.src = audioUrl;
        audio.play();
      }
    );
  };

  return (
    <Grid container spacing={2}>
      {stories.map((story) => (
        <Grid item xs={12} sm={6} md={4} key={story.id}>
          {/* Render each story card here */}
          <Card className={classes.form}>
            <CardContent className={classes.title}>
              <Typography variant="h5">
                {new Date(story.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </Typography>

              <Typography variant="body1">{story.text}</Typography>
            </CardContent>
            <CardActions>
              <Button
                className={classes.submitButton}
                size="small"
                onClick={() => handleReadMoreClicked(story.text)}
              >
                Read for Me!
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
