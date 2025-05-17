export class CreatePlaylistUsecase {
    constructor(playlistRepository) {
      this.playlistRepository = playlistRepository
    }
  
    create = async (name, description, editable) => {
     const createdPlaylist = this.playlistRepository.create(name, description, editable)
      return createdPlaylist
    }
  }