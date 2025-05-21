import { GetPlaylistsUsecase } from '../playlist/getPlaylistsUsecase.js'

describe('GetPlaylistsUsecase', () => {
  let usecase
  let mockPlaylistRepository

  beforeEach(() => {
    mockPlaylistRepository = {
      getList: jest.fn(),
    }

    usecase = new GetPlaylistsUsecase(mockPlaylistRepository)
  })

  it('should return the list of playlists when a name is provided', async () => {
    const name = 'Forró'
    const fakePlaylists = [
      { id: 1, name: 'Forró Pé de Serra' },
      { id: 2, name: 'Forró Universitário' },
    ]

    mockPlaylistRepository.getList.mockResolvedValue(fakePlaylists)

    const result = await usecase.getList(name)

    expect(mockPlaylistRepository.getList).toHaveBeenCalledWith(name)
    expect(result).toEqual(fakePlaylists)
  })

  it('should return an empty list if no playlists are found', async () => {
    const name = 'Nada a ver'
    mockPlaylistRepository.getList.mockResolvedValue([])

    const result = await usecase.getList(name)

    expect(mockPlaylistRepository.getList).toHaveBeenCalledWith(name)
    expect(result).toEqual([])
  })
})
