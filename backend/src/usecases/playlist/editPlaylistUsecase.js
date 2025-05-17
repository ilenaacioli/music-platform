export class EditPlaylistUsecase {
    constructor(playlistRepository) {
      this.playlistRepository = playlistRepository
    }
  
    edit = async (name, description, editable, id) => {

        const updateData = {}

        if (name !== undefined) updateData.name = name
        if (description !== undefined) updateData.description = description
        if (editable !== undefined) updateData.editable = editable
      
        if (Object.keys(updateData).length === 0) {
          throw new Error('No data to update')
        }

     const createdPlaylist = this.playlistRepository.edit(updateData, id)
      return createdPlaylist
    }
  }