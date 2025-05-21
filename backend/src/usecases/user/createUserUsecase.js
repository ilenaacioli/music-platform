export class CreateUserUsecase {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  create = async (email, name, password) => {
    const getUserByEmail = await this.userRepository.getByEmail(email)

    if (getUserByEmail) {
      throw new Error('User already exists')
    }

    const user = await this.userRepository.create(email, name, password)
    return 'User created with success'
  }
}
