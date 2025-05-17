export class CreateUserUsecase {
    constructor(userRepository) {
      this.userRepository = userRepository
    }
  
    create = async (email,name, password) => {

        const getUserByEmail = this.userRepository.getByEmail(email)

    
        if (getUserByEmail) {
            throw new Error('User already exists')
        }
       
      const user = await this.userRepository.create(email,name, password)
      return user
    }
  }