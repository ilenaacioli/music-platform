import db from '../db.js'

export class PlaylistRepository {
  constructor() {}

  getList = async (name) => {
    const rows = await db('playlists')
      .select(
        'playlists.id as playlistId',
        'playlists.name as playlistName',
        'playlists.description',
        'playlists.editable',
        'musics.id as musicId',
        'musics.name as musicTitle',
        'musics.artist',
        'musics.duration',
        'musics.url',
        'musics.md5Cover'
      )
      .leftJoin('musics', 'playlists.id', 'musics.playlistId')
      .modify((queryBuilder) => {
        if (name) {
          queryBuilder.where('playlists.name', 'like', `%${name}%`)
        }
      })

    const playlistsMap = {}

    for (const row of rows) {
      if (!playlistsMap[row.playlistId]) {
        playlistsMap[row.playlistId] = {
          id: row.playlistId,
          name: row.playlistName,
          description: row.description,
          editable: row.editable,
          musics: [],
        }
      }

      if (row.musicId) {
        playlistsMap[row.playlistId].musics.push({
          id: row.musicId,
          name: row.musicTitle,
          artist: row.artist,
          duration: row.duration,
          url: row.url,
          md5Cover: row.md5Cover,
        })
      }
    }

    return Object.values(playlistsMap)
  }

  create = async (name, description, userId, editable) => {
    const playlists = await db('playlists').insert({
      name,
      description,
      userId,
      editable,
    })
    return playlists
  }

  edit = async (updateData, id) => {
    const playlist = await db('playlists').where({ id }).update(updateData)
    return playlist
  }

  getById = async (id) => {
    const playlist = await db('playlists')
      .select(
        'playlists.id as playlistId',
        'playlists.name as playlistName',
        'playlists.description',
        'playlists.editable',
        'musics.id as musicId',
        'musics.name as musicTitle',
        'musics.artist',
        'musics.duration',
        'musics.url',
        'musics.md5Cover'
      )
      .leftJoin('musics', 'playlists.id', 'musics.playlistId')
      .where('playlists.id', id)

    if (playlist.length === 0) return null

    const { playlistName, description, editable } = playlist[0]
    const musics = playlist
      .filter((row) => row.musicId !== null)
      .map((row) => ({
        id: row.musicId,
        name: row.musicTitle,
        artist: row.artist,
        duration: row.duration,
        url: row.url,
        md5Cover: row.md5Cover,
      }))

    return {
      id,
      name: playlistName,
      description,
      editable,
      musics,
    }
  }

  delete = async (id) => {
    await db('playlists').delete().where({ id })
  }
}
