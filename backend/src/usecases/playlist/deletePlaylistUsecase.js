export class DeletePlaylistUsecase {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  delete = async (id) => {
    const playlist = await this.playlistRepository.getById(id)

    if (!playlist) {
      throw new Error('Playlist not found')
    }

    // TODO: DELETE MUSIC BEFORE DELETE PLAYLIST

    await this.playlistRepository.delete(id)
    return 'Playlist deleted with success'
  }
}
