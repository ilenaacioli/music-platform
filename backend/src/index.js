import express, { json } from 'express'
import cors from 'cors'

const app = express()

import userRoutes from './routes/user.js'
import playlistRoutes from './routes/playlists.js'
import musicRoutes from './routes/music.js'

app.use(cors())
app.use(json())
app.use(userRoutes)
app.use(playlistRoutes)
app.use(musicRoutes)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
