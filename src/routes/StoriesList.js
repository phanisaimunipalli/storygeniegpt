import { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import AWS from 'aws-sdk'

const Polly = new AWS.Polly({
  region: 'us-east-1',
  accessKeyId: '<your-access-key-id>',
  secretAccessKey: '<your-secret-access-key>',
})

export default function StoriesList() {
  const [stories, setStories] = useState([])
  const [polly, setPolly] = useState(null)

  useEffect(() => {
    axios
      .get('https://ehtr2028d0.execute-api.us-east-1.amazonaws.com/stories')
      .then((response) => {
        // console.log('response.data: ', response.data)
        setStories(response.data)
      })
      .catch((error) => {
        console.error(error)
      })

    // Initialize Polly object
    const polly = new AWS.Polly({
      region: 'us-east-1',
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    })
    setPolly(polly)
  }, [])

  const handleReadMoreClicked = (text) => {
    // Synthesize speech using Polly
    polly.synthesizeSpeech(
      {
        OutputFormat: 'mp3',
        Text: text,
        VoiceId: 'Kevin',
        Engine: 'neural',
      },
      (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        // console.log('data: ', data)
        const audioBlob = new Blob([data.AudioStream], { type: 'audio/mp3' })
        const audioUrl = window.URL.createObjectURL(audioBlob)
        // console.log('audioUrl: ', audioUrl)
        const audio = new Audio()
        audio.src = audioUrl
        audio.play()
      }
    )
  }

  return (
    <Grid container spacing={2}>
      {stories.map((story) => (
        <Grid item xs={12} sm={6} md={4} key={story.id}>
          {/* Render each story card here */}
          <Card>
            <CardContent>
              <Typography variant="h5">
                {new Date(story.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </Typography>

              <Typography variant="body1">{story.text}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={() => handleReadMoreClicked(story.text)}>
                Read for Me!
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
