import { DeleteMusicFromPlaylistUsecase } from '../music/deleteMusicFromPlaylistUsecase.js'

describe('DeleteMusicFromPlaylistUsecase', () => {
  let usecase
  let mockMusicRepository
  let mockPlaylistRepository

  beforeEach(() => {
    mockMusicRepository = {
      getById: jest.fn(),
      delete: jest.fn(),
    }

    mockPlaylistRepository = {
      getById: jest.fn(),
    }

    usecase = new DeleteMusicFromPlaylistUsecase(
      mockMusicRepository,
      mockPlaylistRepository
    )
  })

  it('should delete music from a valid playlist and return a success message', async () => {
    const playlistId = 1
    const musicId = 5
    const fakePlaylist = { id: playlistId, name: 'Forró Antigo' }
    const fakeMusic = { id: musicId, playlistId: playlistId }

    mockPlaylistRepository.getById.mockResolvedValue(fakePlaylist)
    mockMusicRepository.getById.mockResolvedValue(fakeMusic)
    mockMusicRepository.delete.mockResolvedValue()

    const result = await usecase.delete(musicId, playlistId)

    expect(mockPlaylistRepository.getById).toHaveBeenCalledWith(playlistId)
    expect(mockMusicRepository.getById).toHaveBeenCalledWith(musicId)
    expect(mockMusicRepository.delete).toHaveBeenCalledWith(musicId, playlistId)
    expect(result).toBe('Music deleted with success')
  })

  it('should throw an error if the playlist does not exist', async () => {
    mockPlaylistRepository.getById.mockResolvedValue(null)

    await expect(usecase.delete(5, 1)).rejects.toThrow('Playlist not found')

    expect(mockPlaylistRepository.getById).toHaveBeenCalledWith(1)
    expect(mockMusicRepository.getById).not.toHaveBeenCalled()
    expect(mockMusicRepository.delete).not.toHaveBeenCalled()
  })

  it('should throw an error if the music does not exist', async () => {
    const playlistId = 1
    const musicId = 5
    const fakePlaylist = { id: playlistId, name: 'Xote e Baião' }

    mockPlaylistRepository.getById.mockResolvedValue(fakePlaylist)
    mockMusicRepository.getById.mockResolvedValue(null)

    await expect(usecase.delete(musicId, playlistId)).rejects.toThrow(
      'Playlist not found'
    )

    expect(mockPlaylistRepository.getById).toHaveBeenCalledWith(playlistId)
    expect(mockMusicRepository.getById).toHaveBeenCalledWith(musicId)
    expect(mockMusicRepository.delete).not.toHaveBeenCalled()
  })
})
