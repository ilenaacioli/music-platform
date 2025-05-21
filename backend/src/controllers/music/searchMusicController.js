import Joi from 'joi'

export class SearchMusicController {
  constructor(searchMusicUsecase) {
    this.searchMusicUsecase = searchMusicUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        name: Joi.string().required(),
        updateUrl: Joi.boolean().required(),
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {
    try {
      await this.validateBody(request.body)
      const { name, updateUrl } = request.body

      const data = await this.searchMusicUsecase.search(name, updateUrl)

      response.status(200).json({ data: data })
    } catch (error) {
      response.status(400).json({ errorMessage: error.message })
    }
  }
}
