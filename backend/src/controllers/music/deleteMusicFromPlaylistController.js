import Joi from 'joi'

export class DeleteMusicFromPlaylistController {
  constructor(deleteMusicFromPlaylistUsecase) {
    this.deleteMusicFromPlaylistUsecase = deleteMusicFromPlaylistUsecase
  }

  validateBody = async (body) => {
    return Joi.object()
      .keys({
        id: Joi.number().required(),
        playlistId: Joi.number().required(),
      })
      .required()
      .validateAsync(body)
  }

  handle = async (request, response) => {
    try {
      await this.validateBody(request.body)
      const { id, playlistId } = request.body

      const data = await this.deleteMusicFromPlaylistUsecase.delete(
        id,
        playlistId
      )

      response.status(200).json({ data: data })
    } catch (error) {
      response.status(400).json({ errorMessage: error.message })
    }
  }
}
