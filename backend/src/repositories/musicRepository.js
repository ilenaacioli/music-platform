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
}
