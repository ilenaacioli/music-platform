import express from 'express'
const router = express.Router()

import { GetPlaylistsUsecase } from '../usecases/playlist/getPlaylistsUsecase.js'
import { PlaylistRepository } from '../repositories/playlistRepository.js'
import { GetPlaylistsController } from '../controllers/playlist/getPlaylistsController.js'
import { CreatePlaylistUsecase } from '../usecases/playlist/createPlaylistUsecase.js'
import { CreatePlaylistController } from '../controllers/playlist/createPlaylistController.js'
import { EditPlaylistUsecase } from '../usecases/playlist/editPlaylistUsecase.js'
import { EditPlaylistController } from '../controllers/playlist/editPlaylistController.js'
import { DeletePlaylistUsecase } from '../usecases/playlist/deletePlaylistUsecase.js'
import { DeletePlaylistController } from '../controllers/playlist/deletePlaylistController.js'
import { GetPlaylistByIdUsecase } from '../usecases/playlist/getPlaylistByIdUsecase.js'
import { GetPlaylistByIdController } from '../controllers/playlist/getPlaylistByIdController.js'
import { MusicRepository } from '../repositories/musicRepository.js'

const playlistRepository = new PlaylistRepository()
const musicRepository = new MusicRepository()

// GET /playlist
const getPlaylistByIdUsecase = new GetPlaylistByIdUsecase(playlistRepository)
const getPlaylistByIdController = new GetPlaylistByIdController(
  getPlaylistByIdUsecase
)
router.get('/playlist/:id', (req, res) =>
  getPlaylistByIdController.handle(req, res)
)

// GET /playlist
const getPlaylistsUsecase = new GetPlaylistsUsecase(playlistRepository)
const getPlaylistsController = new GetPlaylistsController(getPlaylistsUsecase)
router.get('/playlist', (req, res) => getPlaylistsController.handle(req, res))

// POST /playlist
const createPlaylistUsecase = new CreatePlaylistUsecase(playlistRepository)
const createPlaylistController = new CreatePlaylistController(
  createPlaylistUsecase
)
router.post('/playlist', (req, res) =>
  createPlaylistController.handle(req, res)
)

// PUT /playlist
const editPlaylistUsecase = new EditPlaylistUsecase(playlistRepository)
const editPlaylistController = new EditPlaylistController(editPlaylistUsecase)
router.put('/playlist', (req, res) => editPlaylistController.handle(req, res))

// DELETE /playlist
const deletePlaylistUsecase = new DeletePlaylistUsecase(
  playlistRepository,
  musicRepository
)
const deletePlaylistController = new DeletePlaylistController(
  deletePlaylistUsecase
)
router.delete('/playlist/:id', (req, res) =>
  deletePlaylistController.handle(req, res)
)

export default router
