export class EditPlaylistUsecase {
  constructor(playlistRepository) {
    this.playlistRepository = playlistRepository
  }

  edit = async (name, description, editable, id, userId) => {
    const updateData = {
      userId,
    }

    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (editable !== undefined) updateData.editable = editable

    if (Object.keys(updateData).length === 0) {
      throw new Error('No data to update')
    }

    const createdPlaylist = await this.playlistRepository.edit(updateData, id)
    return 'Playlist edited with suceess'
  }
}
