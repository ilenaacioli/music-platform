export class GetPlaylistByIdUsecase {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  getById = async (id) => {
    const getPlaylist = await this.playlistRepository.getById(id)

    if (!getPlaylist) {
      throw new Error('Playlist not found')
    }
    return getPlaylist
  }
}
