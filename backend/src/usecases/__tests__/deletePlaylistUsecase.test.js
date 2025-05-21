import { DeletePlaylistUsecase } from '../playlist/deletePlaylistUsecase.js'

describe('DeletePlaylistUsecase', () => {
  let usecase
  let mockPlaylistRepository
  let mockMusicRepository

  beforeEach(() => {
    mockPlaylistRepository = {
      getById: jest.fn(),
      delete: jest.fn(),
    }

    mockMusicRepository = {
      deleteFromPlaylist: jest.fn(),
    }

    usecase = new DeletePlaylistUsecase(
      mockPlaylistRepository,
      mockMusicRepository
    )
  })

  it('should delete the playlist and its musics if the playlist exists', async () => {
    const playlistId = 1
    const fakePlaylist = { id: playlistId, name: 'Forró Pesado' }

    mockPlaylistRepository.getById.mockResolvedValue(fakePlaylist)
    mockMusicRepository.deleteFromPlaylist.mockResolvedValue()
    mockPlaylistRepository.delete.mockResolvedValue()

    const result = await usecase.delete(playlistId)

    expect(mockPlaylistRepository.getById).toHaveBeenCalledWith(playlistId)
    expect(mockMusicRepository.deleteFromPlaylist).toHaveBeenCalledWith(
      playlistId
    )
    expect(mockPlaylistRepository.delete).toHaveBeenCalledWith(playlistId)
    expect(result).toBe('Playlist deleted with success')
  })

  it('should throw an error if the playlist does not exist', async () => {
    const playlistId = 999

    mockPlaylistRepository.getById.mockResolvedValue(null)

    await expect(usecase.delete(playlistId)).rejects.toThrow(
      'Playlist not found'
    )

    expect(mockPlaylistRepository.getById).toHaveBeenCalledWith(playlistId)
    expect(mockMusicRepository.deleteFromPlaylist).not.toHaveBeenCalled()
    expect(mockPlaylistRepository.delete).not.toHaveBeenCalled()
  })
})
