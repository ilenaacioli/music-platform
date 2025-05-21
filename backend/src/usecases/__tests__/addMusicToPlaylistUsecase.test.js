import { AddMusicToPlaylistUsecase } from '../music/addMusicToPlaylistUsecase.js'

describe('AddMusicToPlaylistUsecase', () => {
  let usecase
  let mockMusicRepository
  let mockPlaylistRepository

  beforeEach(() => {
    mockMusicRepository = {
      add: jest.fn(),
    }

    mockPlaylistRepository = {
      getById: jest.fn(),
    }

    usecase = new AddMusicToPlaylistUsecase(
      mockMusicRepository,
      mockPlaylistRepository
    )
  })

  it('must add music to an existing playlist', async () => {
    const playlistId = 1
    const musicData = {
      name: 'Asa Branca',
      artist: 'Luiz Gonzaga',
      url: 'https://musicas.com/asa-branca',
      duration: 180,
      cover: 'https://capa.com/asa.jpg',
    }

    const fakePlaylist = { id: playlistId, name: 'Forró Raiz' }
    const fakeMusic = { id: 10, ...musicData, playlistId }

    mockPlaylistRepository.getById.mockResolvedValue(fakePlaylist)
    mockMusicRepository.add.mockResolvedValue(fakeMusic)

    const result = await usecase.add(
      playlistId,
      musicData.name,
      musicData.artist,
      musicData.url,
      musicData.duration,
      musicData.cover
    )

    expect(mockPlaylistRepository.getById).toHaveBeenCalledWith(playlistId)
    expect(mockMusicRepository.add).toHaveBeenCalledWith(
      musicData.name,
      musicData.artist,
      musicData.url,
      playlistId,
      musicData.duration,
      musicData.cover
    )

    expect(result).toEqual(fakeMusic)
  })

  it('should throw error if playlist not found', async () => {
    mockPlaylistRepository.getById.mockResolvedValue(null)

    await expect(
      usecase.add(1, 'música', 'artista', 'url', 100, 'cover')
    ).rejects.toThrow('Playlist not found')

    expect(mockPlaylistRepository.getById).toHaveBeenCalledWith(1)
    expect(mockMusicRepository.add).not.toHaveBeenCalled()
  })
})
