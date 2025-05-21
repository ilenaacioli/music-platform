import { GetPlaylistByIdUsecase } from '../playlist/getPlaylistByIdUsecase.js'

describe('GetPlaylistByIdUsecase', () => {
  let usecase
  let mockPlaylistRepository

  beforeEach(() => {
    mockPlaylistRepository = {
      getById: jest.fn(),
    }

    usecase = new GetPlaylistByIdUsecase(mockPlaylistRepository)
  })

  it('should return the playlist when found', async () => {
    const playlistId = 1
    const fakePlaylist = {
      id: playlistId,
      name: 'Chá de Forró',
      description: 'Playlist animada',
      editable: true,
    }

    mockPlaylistRepository.getById.mockResolvedValue(fakePlaylist)

    const result = await usecase.getById(playlistId)

    expect(mockPlaylistRepository.getById).toHaveBeenCalledWith(playlistId)
    expect(result).toEqual(fakePlaylist)
  })

  it('should throw an error if playlist is not found', async () => {
    const playlistId = 999

    mockPlaylistRepository.getById.mockResolvedValue(null)

    await expect(usecase.getById(playlistId)).rejects.toThrow(
      'Playlist not found'
    )
    expect(mockPlaylistRepository.getById).toHaveBeenCalledWith(playlistId)
  })
})
