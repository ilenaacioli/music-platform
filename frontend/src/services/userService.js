const API_URL = `${import.meta.env.VITE_BACKEND_URL}/user`

export async function getUserByEmail(email) {
  const url = API_URL + `?email=${email}`

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
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
    console.log('Erro ao buscar usuário:', error)
    throw error
  }
}
