const API_URL = `${import.meta.env.VITE_BACKEND_URL}/playlist`

export async function getPlaylists(name) {
  let url = API_URL

  if (name) {
    url = url + `?name=${name}`
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

export async function create(name, description, userId, editable) {
  const url = API_URL

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        userId,
        editable,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (result.errorMessage) {
      throw new Error(result.errorMessage)
    }

    return result.data
  } catch (error) {
    console.log('Erro ao criar playlist:', error)
    throw error
  }
}

export async function getPlaylistById(id) {
  const url = API_URL + `/${id}`

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
    console.log('Erro ao buscar playlist:', error)
    throw error
  }
}

export async function deletePlaylistById(id) {
  const url = API_URL + `/${id}`

  try {
    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (result.errorMessage) {
      throw new Error(result.errorMessage)
    }

    return result.data
  } catch (error) {
    console.log('Erro ao deletar playlists:', error)
    throw error
  }
}
