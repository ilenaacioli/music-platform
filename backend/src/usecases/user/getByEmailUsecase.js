export class GetByEmailUsecase {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  getByEmail = async (email) => {
    const user = await this.userRepository.getByEmail(email)
    return user
  }
}
