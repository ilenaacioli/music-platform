import Joi from 'joi'

export class GetPlaylistsController {
  constructor(getPlaylistsUsecase) {
    this.getPlaylistsUsecase = getPlaylistsUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        name: Joi.string().optional(),
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {

    try {
      await this.validateBody( request.body)
    const { name  } = request.query

    const data = await this.getPlaylistsUsecase.getList(name )

    response.status(200).json({ data: data})
    } catch (error) {

      response.status(400).json({errorMessage: error.message})
    }
    
  }
}