import express, { json } from 'express'

const app = express()

import userRoutes from './routes/user.js'
import playlistRoutes from './routes/playlists.js' 
app.use(json())
app.use(userRoutes)
app.use(playlistRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})