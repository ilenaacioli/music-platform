export class AddMusicToPlaylistUsecase {
  constructor(musicRepository, playlistRepository) {
    ;(this.musicRepository = musicRepository),
      (this.playlistRepository = playlistRepository)
  }

  add = async (playlistId, name, artist, url, duration, cover) => {
    const playlist = await this.playlistRepository.getById(playlistId)

    if (!playlist) {
      throw new Error('Playlist not found')
    }

    const music = await this.musicRepository.add(
      name,
      artist,
      url,
      playlistId,
      duration,
      cover
    )

    return 'Music added with success'
  }
}
