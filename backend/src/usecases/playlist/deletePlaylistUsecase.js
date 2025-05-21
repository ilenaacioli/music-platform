export class DeletePlaylistUsecase {
  constructor(playlistRepository, musicRepository) {
    this.playlistRepository = playlistRepository
    this.musicRepository = musicRepository
  }

  delete = async (id) => {
    const playlist = await this.playlistRepository.getById(id)

    if (!playlist) {
      throw new Error('Playlist not found')
    }

    await this.musicRepository.deleteFromPlaylist(id)

    await this.playlistRepository.delete(id)
    return 'Playlist deleted with success'
  }
}
