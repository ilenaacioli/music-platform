export class GetPlaylistsUsecase {
    constructor(playlistRepository) {
      this.playlistRepository = playlistRepository
    }
  
    getList = async (name) => {
     const getPlaylists = this.playlistRepository.getList(name)
      return getPlaylists
    }
  }