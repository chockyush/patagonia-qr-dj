import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

let tokenExpirationTime = 0;

async function refreshAccessToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    tokenExpirationTime = Math.floor(Date.now() / 1000) + data.body['expires_in'];
    console.log('✅ Spotify access token refreshed');
  } catch (err) {
    console.error('❌ Error refreshing Spotify token:', err);
  }
}

export async function searchTracks(query: string) {
  if (Date.now() / 1000 > tokenExpirationTime) {
    await refreshAccessToken();
  }

  try {
    const data = await spotifyApi.searchTracks(query, { limit: 10 });
    return data.body.tracks?.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      albumCover: track.album.images[0]?.url,
      spotifyUri: track.uri,
    })) || [];
  } catch (err) {
    console.error('❌ Error searching tracks:', err);
    return [];
  }
}
