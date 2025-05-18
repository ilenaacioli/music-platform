const API_URL = 'http://localhost:5000/music'

export async function searchMusic(name) {
  const url = API_URL

  if (name) {
    url.append(`?name=${name}`)
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    return result.data
  } catch (error) {
    console.log('Erro ao buscar playlists:', error)
    throw error
  }
}
