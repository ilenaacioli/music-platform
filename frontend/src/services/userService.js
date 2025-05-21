const API_URL = 'http://localhost:5000/user'

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

    console.log(result, 'RESTULTTTTT')

    return result.data
  } catch (error) {
    console.log('Erro ao buscar usuário:', error)
    throw error
  }
}
