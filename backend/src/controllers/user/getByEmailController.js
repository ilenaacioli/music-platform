import Joi from 'joi'

export class GetByEmailController {
  constructor(getByEmailUsecase) {
    this.getByEmailUsecase = getByEmailUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        email: Joi.string().required(),
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {
    try {
      const { email } = request.query
      await this.validateBody({ email })

      const data = await this.getByEmailUsecase.getByEmail(email)

      response.status(200).json({ data: data })
    } catch (error) {
      response.status(400).json({ errorMessage: error.message })
    }
  }
}
