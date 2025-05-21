import { CreateUserUsecase } from '../user/createUserUsecase.js'

describe('CreateUserUsecase', () => {
  let usecase
  let mockUserRepository

  beforeEach(() => {
    mockUserRepository = {
      getByEmail: jest.fn(),
      create: jest.fn(),
    }

    usecase = new CreateUserUsecase(mockUserRepository)
  })

  it('should create a new user if email is not already in use', async () => {
    const email = 'test@example.com'
    const name = 'Test User'
    const password = 'password123'
    const fakeUser = { id: 1, email, name }

    mockUserRepository.getByEmail.mockResolvedValue(null)
    mockUserRepository.create.mockResolvedValue(fakeUser)

    const result = await usecase.create(email, name, password)

    expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(email)
    expect(mockUserRepository.create).toHaveBeenCalledWith(
      email,
      name,
      password
    )
    expect(result).toEqual(fakeUser)
  })

  it('should throw an error if user already exists', async () => {
    const email = 'test@example.com'
    const name = 'Existing User'
    const password = 'password123'

    mockUserRepository.getByEmail.mockResolvedValue({ id: 2, email, name })

    await expect(usecase.create(email, name, password)).rejects.toThrow(
      'User already exists'
    )
    expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(email)
    expect(mockUserRepository.create).not.toHaveBeenCalled()
  })
})
