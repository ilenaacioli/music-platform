import { SearchMusicUsecase } from '../music/searchMusicUsecase.js'

describe('SearchMusicUsecase', () => {
  let usecase
  let mockMusicRepository

  beforeEach(() => {
    mockMusicRepository = {
      getByName: jest.fn(),
      updateMusicUrl: jest.fn(),
    }

    usecase = new SearchMusicUsecase(mockMusicRepository)

    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should fetch music data from Deezer and return it when updateUrl is false', async () => {
    const fakeDeezerData = {
      data: [
        {
          title: 'Asa Branca',
          artist: { name: 'Luiz Gonzaga' },
          preview: 'https://preview.deezer.com/asabranca',
        },
      ],
    }

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(fakeDeezerData),
    })

    const result = await usecase.search('Asa Branca', false)

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.deezer.com/search')
    )
    expect(result).toEqual(fakeDeezerData.data)
    expect(mockMusicRepository.getByName).not.toHaveBeenCalled()
    expect(mockMusicRepository.updateMusicUrl).not.toHaveBeenCalled()
  })

  it('should update the music URL and return the updated music when updateUrl is true', async () => {
    const fakeDeezerData = {
      data: [{ preview: 'https://preview.deezer.com/asabranca' }],
    }

    const fakeMusic = { id: 123, name: 'Asa Branca' }
    const updatedMusic = [
      { id: 123, url: 'https://preview.deezer.com/asabranca' },
    ]

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(fakeDeezerData),
    })

    mockMusicRepository.getByName.mockResolvedValue(fakeMusic)
    mockMusicRepository.updateMusicUrl.mockResolvedValue(updatedMusic)

    const result = await usecase.search('Asa Branca', true)

    expect(mockMusicRepository.getByName).toHaveBeenCalledWith('Asa Branca')
    expect(mockMusicRepository.updateMusicUrl).toHaveBeenCalledWith(
      fakeMusic.id,
      'https://preview.deezer.com/asabranca'
    )
    expect(result).toEqual(updatedMusic[0])
  })

  it('should throw an error if the fetch fails', async () => {
    fetch.mockRejectedValue(new Error('Network error'))

    await expect(usecase.search('Asa Branca', false)).rejects.toThrow(
      'Failed to get music on deezer'
    )
  })
})
