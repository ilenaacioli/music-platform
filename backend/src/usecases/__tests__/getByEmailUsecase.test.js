import { GetByEmailUsecase } from '../user/getByEmailUsecase.js'

describe('GetByEmailUsecase', () => {
  let usecase
  let mockUserRepository

  beforeEach(() => {
    mockUserRepository = {
      getByEmail: jest.fn(),
    }
    usecase = new GetByEmailUsecase(mockUserRepository)
  })

  it('should return user when found by email', async () => {
    const email = 'user@example.com'
    const fakeUser = { id: 1, email, name: 'User Test' }

    mockUserRepository.getByEmail.mockResolvedValue(fakeUser)

    const result = await usecase.getByEmail(email)

    expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(email)
    expect(result).toEqual(fakeUser)
  })

  it('should throw an error if user not found', async () => {
    const email = 'missing@example.com'

    mockUserRepository.getByEmail.mockResolvedValue(null)

    await expect(usecase.getByEmail(email)).rejects.toThrow('User not found')
    expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(email)
  })
})
