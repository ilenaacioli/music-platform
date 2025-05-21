const API_URL = 'http://localhost:5000/music'

export async function searchMusic(name, updateUrl) {
  const url = API_URL

  try {
    const response = await fetch(url.toString(), {
      method: 'PUT',
      body: JSON.stringify({
        name,
        updateUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    return result.data
  } catch (error) {
    console.log('Erro ao buscar músicas:', error)
    throw error
  }
}

export async function addToPlaylist(
  playlistId,
  name,
  url,
  cover,
  artist,
  duration
) {
  const apiUrl = API_URL

  try {
    const response = await fetch(apiUrl.toString(), {
      method: 'POST',
      body: JSON.stringify({
        playlistId,
        name,
        url,
        cover,
        artist,
        duration,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    return result.data
  } catch (error) {
    console.log('Erro ao adicionar música a playlist:', error)
    throw error
  }
}
