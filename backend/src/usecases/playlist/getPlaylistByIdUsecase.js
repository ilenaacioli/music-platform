export class GetPlaylistByIdUsecase {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  getById = async (id) => {
    const getPlaylists = await this.playlistRepository.getById(id)
    return getPlaylists
  }
}
