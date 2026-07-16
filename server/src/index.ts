import { getSpotifyAccessToken } from './spotify'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'

const app = express()
const port = 3000
const hasSpotifyCredentials =
  Boolean(process.env.SPOTIFY_CLIENT_ID) &&
  Boolean(process.env.SPOTIFY_CLIENT_SECRET)

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    success: true,
    message: 'Album Explorer API is running',
    spotifyConfigured: hasSpotifyCredentials,
  })
})

app.get('/api/spotify/test', async (_request, response) => {
  try {
    const token = await getSpotifyAccessToken()

    response.json({
      success: true,
      message: 'Spotify authentication succeeded',
      tokenReceived: Boolean(token),
    })
  } catch (error) {
    console.error(error)

    response.status(500).json({
      success: false,
      message: 'Spotify authentication failed',
    })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})