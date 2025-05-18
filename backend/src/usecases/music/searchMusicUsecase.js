export class SearchMusicUsecase {
  constructor(musicRepository) {
    this.musicRepository = musicRepository
  }

  search = async (name) => {
    const DEEZER_URL = `https://api.deezer.com/search?q=${encodeURIComponent(
      name
    )}`

    try {
      const response = await fetch(DEEZER_URL)

      const deezerResponse = await response.json()

      return deezerResponse
    } catch (error) {
      throw new Error(`Failed to get music on deezer`)
    }
  }
}
