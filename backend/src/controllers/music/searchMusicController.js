import Joi from 'joi'

export class SearchMusicController {
  constructor(searchMusicUsecase) {
    this.searchMusicUsecase = searchMusicUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        name: Joi.string().required(),
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {
    try {
      await this.validateBody(request.query)
      const { name } = request.query

      const data = await this.searchMusicUsecase.search(name)

      response.status(200).json({ data: data.data })
    } catch (error) {
      response.status(400).json({ errorMessage: error.message })
    }
  }
}
