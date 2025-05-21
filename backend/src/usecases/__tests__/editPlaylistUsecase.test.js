import { EditPlaylistUsecase } from '../playlist/editPlaylistUsecase.js'

describe('EditPlaylistUsecase', () => {
  let usecase
  let mockPlaylistRepository

  beforeEach(() => {
    mockPlaylistRepository = {
      edit: jest.fn(),
    }

    usecase = new EditPlaylistUsecase(mockPlaylistRepository)
  })

  it('should update the playlist with all provided fields', async () => {
    const playlistId = 1
    const input = {
      name: 'Forró Atualizado',
      description: 'Novas do São João',
      editable: false,
    }

    const updatedPlaylist = { id: playlistId, ...input }

    mockPlaylistRepository.edit.mockResolvedValue(updatedPlaylist)

    const result = await usecase.edit(
      input.name,
      input.description,
      input.editable,
      playlistId
    )

    expect(mockPlaylistRepository.edit).toHaveBeenCalledWith(input, playlistId)
    expect(result).toEqual(updatedPlaylist)
  })

  it('should update only the provided fields', async () => {
    const playlistId = 2
    const input = {
      name: 'Só o nome',
    }

    const updatedPlaylist = { id: playlistId, ...input }

    mockPlaylistRepository.edit.mockResolvedValue(updatedPlaylist)

    const result = await usecase.edit(
      input.name,
      undefined,
      undefined,
      playlistId
    )

    expect(mockPlaylistRepository.edit).toHaveBeenCalledWith(input, playlistId)
    expect(result).toEqual(updatedPlaylist)
  })

  it('should throw an error if no data is provided to update', async () => {
    await expect(
      usecase.edit(undefined, undefined, undefined, 1)
    ).rejects.toThrow('No data to update')

    expect(mockPlaylistRepository.edit).not.toHaveBeenCalled()
  })
})
