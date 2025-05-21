import { CreatePlaylistUsecase } from '../playlist/createPlaylistUsecase.js'

describe('CreatePlaylistUsecase', () => {
  let usecase
  let mockPlaylistRepository

  beforeEach(() => {
    mockPlaylistRepository = {
      create: jest.fn(),
    }

    usecase = new CreatePlaylistUsecase(mockPlaylistRepository)
  })

  it('should create a playlist with the given data and return the result', async () => {
    const input = {
      name: 'Forró das Antigas',
      description: 'Clássicos do forró dos anos 90',
      userId: 42,
      editable: true,
    }

    const fakeCreatedPlaylist = {
      id: 1,
      ...input,
    }

    mockPlaylistRepository.create.mockResolvedValue(fakeCreatedPlaylist)

    const result = await usecase.create(
      input.name,
      input.description,
      input.userId,
      input.editable
    )

    expect(mockPlaylistRepository.create).toHaveBeenCalledWith(
      input.name,
      input.description,
      input.userId,
      input.editable
    )

    expect(result).toEqual(fakeCreatedPlaylist)
  })
})
