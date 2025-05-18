import db from '../db.js'

export class PlaylistRepository {
  constructor() {}

  getList = async (name) => {
    const query = db('playlists')

    if (name) {
      query.where('name', 'like', `%${name}%`)
    }

    return await query
  }

  create = async (name, description, editable) => {
    const playlists = await db('playlists').insert({
      name,
      description,
      editable,
    })
    return playlists
  }

  edit = async (updateData, id) => {
    const playlist = await db('playlists').where({ id }).update(updateData)
    return playlist
  }

  getById = async (id) => {
    const playlists = await db('playlists').where({ id })
    return playlists
  }

  delete = async (id) => {
    await db('playlists').delete().where({ id })
  }
}
