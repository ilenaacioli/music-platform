import Joi from 'joi'

export class CreatePlaylistController {
  constructor(createPlaylistUsecase) {
    this.createPlaylistUsecase = createPlaylistUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().allow('',null),
        editable: Joi.boolean().required(),
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {

    try {
        await this.validateBody(request.body)
        const { name, description, editable } = request.body
    
        const data = await this.createPlaylistUsecase.create(name, description, editable)
    
        response.status(200).json({ data: data })
      } catch (error) {
        response.status(400).json({ errorMessage: error.message })
      }
    
  }
}