import express from 'express'
import { GetPlaylistsUsecase } from '../usecases/playlist/getPlaylistsUsecase.js'
import { PlaylistRepository } from '../repositories/playlistRepository.js'
import { GetPlaylistsController } from '../controllers/playlist/getPlaylistsController.js'
import { CreatePlaylistUsecase } from '../usecases/playlist/createPlaylistUsecase.js'
import { CreatePlaylistController } from '../controllers/playlist/createPlaylistController.js'
import { EditPlaylistUsecase } from '../usecases/playlist/editPlaylistUsecase.js'
import { EditPlaylistController } from '../controllers/playlist/editPlaylistController.js'
const router = express.Router()



const playlistRepository = new PlaylistRepository()

// GET /playlist
const getPlaylistsUsecase = new GetPlaylistsUsecase(playlistRepository)
const getPlaylistsController = new GetPlaylistsController(getPlaylistsUsecase)
router.get('/playlist', (req, res) => getPlaylistsController.handle(req, res))


// POST /playlist
const createPlaylistUsecase = new CreatePlaylistUsecase(playlistRepository)
const createPlaylistController = new CreatePlaylistController(createPlaylistUsecase)
router.post('/playlist', (req, res) => createPlaylistController.handle(req, res))

// PUT /playlist
const editPlaylistUsecase = new EditPlaylistUsecase(playlistRepository)
const editPlaylistController = new EditPlaylistController(editPlaylistUsecase)
router.put('/playlist', (req, res) => editPlaylistController.handle(req, res))



export default router