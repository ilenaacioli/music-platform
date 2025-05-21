import db from '../db.js'

export class MusicRepository {
  constructor() {}

  add = async (name, artist, url, playlistId, duration, cover) => {
    const playlists = await db('musics').insert({
      name,
      artist,
      url,
      playlistId,
      duration,
      md5Cover: cover,
    })
    return playlists
  }

  getById = async (id) => {
    const music = await db('musics').where({ id })
    return music
  }

  delete = async (id, playlistId) => {
    await db('musics').delete().where({ id, playlistId })
  }

  getByName = async (name) => {
    const music = await db('musics').where({ name }).first()
    return music
  }

  updateMusicUrl = async (id, url) => {
    await db('musics').where({ id }).update({ url })

    return this.getById(id)
  }
}
