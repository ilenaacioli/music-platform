import Joi from 'joi'

export class AddMusicToPlaylistController {
  constructor(addMusicToPlaylistUsecase) {
    this.addMusicToPlaylistUsecase = addMusicToPlaylistUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        playlistId: Joi.number().required(),
        name: Joi.string().required(),
        artist: Joi.string().required(),
        url: Joi.string().required(),
        duration: Joi.number().required(),
        cover: Joi.string().required(),
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {
    try {
      await this.validateBody(request.body)
      const { playlistId, name, artist, url, duration, cover } = request.body

      const data = await this.addMusicToPlaylistUsecase.add(
        playlistId,
        name,
        artist,
        url,
        duration,
        cover
      )

      response.status(200).json({ data: data })
    } catch (error) {
      response.status(400).json({ errorMessage: error.message })
    }
  }
}
