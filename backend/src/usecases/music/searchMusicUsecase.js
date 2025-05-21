export class SearchMusicUsecase {
  constructor(musicRepository) {
    this.musicRepository = musicRepository
  }

  search = async (name, updateUrl) => {
    const DEEZER_URL = `https://api.deezer.com/search?q=${encodeURIComponent(
      name
    )}`

    try {
      const response = await fetch(DEEZER_URL)

      const deezerResponse = await response.json()

      if (updateUrl) {
        const music = await this.musicRepository.getByName(name)

        const updatedMusic = await this.musicRepository.updateMusicUrl(
          music.id,
          deezerResponse.data[0].preview
        )

        return updatedMusic[0]
      }

      return deezerResponse.data
    } catch (error) {
      throw new Error(`Failed to get music on deezer`)
    }
  }
}
