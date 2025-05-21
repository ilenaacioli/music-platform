import Joi from 'joi'

export class GetPlaylistByIdController {
  constructor(getPlaylistByIdUsecase) {
    this.getPlaylistByIdUsecase = getPlaylistByIdUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        id: Joi.string().required(),
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {
    try {
      await this.validateBody(request.params)
      const { id } = request.params

      const data = await this.getPlaylistByIdUsecase.getById(id)

      response.status(200).json({ data: data })
    } catch (error) {
      response.status(400).json({ errorMessage: error.message })
    }
  }
}
