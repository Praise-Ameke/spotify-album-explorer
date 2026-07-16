type SpotifyTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
}

export async function getSpotifyAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials are missing')
  }

  const credentials = Buffer.from(
    `${clientId}:${clientSecret}`,
  ).toString('base64')

  const response = await fetch(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Spotify authentication failed: ${response.status}`)
  }

  const data = (await response.json()) as SpotifyTokenResponse

  return data.access_token
}