export class DeleteMusicFromPlaylistUsecase {
  constructor(musicRepository, playlistRepository) {
    ;(this.musicRepository = musicRepository),
      (this.playlistRepository = playlistRepository)
  }

  delete = async (id, playlistId) => {
    const playlist = await this.playlistRepository.getById(playlistId)

    if (!playlist) {
      throw new Error('Playlist not found')
    }

    const music = await this.musicRepository.getById(id)
    if (!music) {
      throw new Error('Playlist not found')
    }

    await this.musicRepository.delete(id, playlistId)

    return 'Music deleted with success'
  }
}
