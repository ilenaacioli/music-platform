import Joi from 'joi'

export class CreateUserController {
  constructor(createUserUsecase) {
    this.createUserUsecase = createUserUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        email: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {

    try {
      await this.validateBody( request.body)
    const { email,name, password  } = request.body

    const data = await this.createUserUsecase.create(email,name, password )

    response.status(200).json({ data: data})
    } catch (error) {

      response.status(400).json({errorMessage: error.message})
    }
    
  }
}