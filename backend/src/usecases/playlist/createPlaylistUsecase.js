export class CreatePlaylistUsecase {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  create = async (name, description, userId, editable) => {
    const createdPlaylist = await this.playlistRepository.create(
      name,
      description,
      userId,
      editable
    )
    return createdPlaylist
  }
}
