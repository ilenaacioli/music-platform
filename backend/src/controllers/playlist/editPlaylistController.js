import Joi from 'joi'

export class EditPlaylistController {
  constructor(editPlaylistUsecase) {
    this.editPlaylistUsecase = editPlaylistUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        name: Joi.string(),
        description: Joi.string().allow('',null),
        editable: Joi.boolean(),
        id: Joi.number().required()
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {

    try {
        await this.validateBody(request.body)
        const { name, description, editable, id } = request.body
    
        const data = await this.editPlaylistUsecase.edit(name, description, editable, id)
    
        response.status(200).json({ data: data })
      } catch (error) {
        response.status(400).json({ errorMessage: error.message })
      }
    
  }
}