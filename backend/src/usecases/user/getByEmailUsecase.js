export class GetByEmailUsecase {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  getByEmail = async (email) => {
    const user = await this.userRepository.getByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
