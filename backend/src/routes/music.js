import express from 'express'
const router = express.Router()

import { SearchMusicUsecase } from '../usecases/music/searchMusicUsecase.js'
import { MusicRepository } from '../repositories/musicRepository.js'
import { SearchMusicController } from '../controllers/music/searchMusicController.js'
import { AddMusicToPlaylistController } from '../controllers/music/addMusicToPlaylistController.js'
import { AddMusicToPlaylistUsecase } from '../usecases/music/addMusicToPlaylistUsecase.js'
import { PlaylistRepository } from '../repositories/playlistRepository.js'
import { DeleteMusicFromPlaylistUsecase } from '../usecases/music/deleteMusicFromPlaylistUsecase.js'
import { DeleteMusicFromPlaylistController } from '../controllers/music/deleteMusicFromPlaylistController.js'

const musicRepository = new MusicRepository()
const playlistRepository = new PlaylistRepository()

// GET /music
const searchMusicUsecase = new SearchMusicUsecase(musicRepository)
const searchMusicController = new SearchMusicController(searchMusicUsecase)
router.get('/music', (req, res) => searchMusicController.handle(req, res))

// POST /music
const addMusicToPlaylistUsecase = new AddMusicToPlaylistUsecase(
  musicRepository,
  playlistRepository
)
const addMusicToPlaylistController = new AddMusicToPlaylistController(
  addMusicToPlaylistUsecase
)
router.post('/music', (req, res) =>
  addMusicToPlaylistController.handle(req, res)
)

// DELETE
const deleteMusicFromPlaylistUsecase = new DeleteMusicFromPlaylistUsecase(
  musicRepository,
  playlistRepository
)
const deleteMusicFromPlaylistController = new DeleteMusicFromPlaylistController(
  deleteMusicFromPlaylistUsecase
)
router.delete('/music', (req, res) =>
  deleteMusicFromPlaylistController.handle(req, res)
)

export default router
