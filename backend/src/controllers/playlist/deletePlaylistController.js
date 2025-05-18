import Joi from 'joi'

export class DeletePlaylistController {
  constructor(deletePlaylistUsecase) {
    this.deletePlaylistUsecase = deletePlaylistUsecase
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

      const data = await this.deletePlaylistUsecase.delete(id)

      response.status(200).json({ data: data })
    } catch (error) {
      response.status(400).json({ errorMessage: error.message })
    }
  }
}
