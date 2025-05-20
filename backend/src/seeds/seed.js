export async function seed(knex) {
  await knex('musics').del()
  await knex('playlists').del()

  const playlistsData = [
    {
      name: 'mpb',
      description: 'Clássicos que tocam a alma e o violão',
      editable: false,
    },
    {
      name: 'forró',
      description: 'Balança o esqueleto com clássicos do forró!',
      editable: false,
    },
    {
      name: 'brega',
      description: 'Amor sofrido, mas com muito estilo',
      editable: false,
    },
    {
      name: 'frevo',
      description: 'Levanta a sombrinha e vem pular!',
      editable: false,
    },
  ]

  for (const playlist of playlistsData) {
    const [playlistId] = await knex('playlists').insert(playlist)

    switch (playlist.name) {
      case 'mpb':
        await knex('musics').insert([
          {
            name: `Música 1 da ${playlist.name}`,
            artist: 'Artista A',
            url: 'http://example.com/music1.mp3',
            md5Cover: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            playlistId,
            duration: 200,
          },
          {
            name: `Música 2 da ${playlist.name}`,
            artist: 'Artista B',
            url: 'http://example.com/music2.mp3',
            md5Cover: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            playlistId,
            duration: 250,
          },
          {
            name: `Música 3 da ${playlist.name}`,
            artist: 'Artista C',
            url: 'http://example.com/music3.mp3',
            md5Cover: 'cccccccccccccccccccccccccccccccc',
            playlistId,
            duration: 180,
          },
        ])
        break
      case 'forró':
        await knex('musics').insert([
          {
            name: `Música 1 da ${playlist.name}`,
            artist: 'Artista A',
            url: 'http://example.com/music1.mp3',
            md5Cover: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            playlistId,
            duration: 200,
          },
          {
            name: `Música 2 da ${playlist.name}`,
            artist: 'Artista B',
            url: 'http://example.com/music2.mp3',
            md5Cover: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            playlistId,
            duration: 250,
          },
          {
            name: `Música 3 da ${playlist.name}`,
            artist: 'Artista C',
            url: 'http://example.com/music3.mp3',
            md5Cover: 'cccccccccccccccccccccccccccccccc',
            playlistId,
            duration: 180,
          },
        ])
        break
      case 'brega':
        await knex('musics').insert([
          {
            name: `Música 1 da ${playlist.name}`,
            artist: 'Artista A',
            url: 'http://example.com/music1.mp3',
            md5Cover: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            playlistId,
            duration: 200,
          },
          {
            name: `Música 2 da ${playlist.name}`,
            artist: 'Artista B',
            url: 'http://example.com/music2.mp3',
            md5Cover: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            playlistId,
            duration: 250,
          },
          {
            name: `Música 3 da ${playlist.name}`,
            artist: 'Artista C',
            url: 'http://example.com/music3.mp3',
            md5Cover: 'cccccccccccccccccccccccccccccccc',
            playlistId,
            duration: 180,
          },
        ])
        break
      case 'frevo':
        await knex('musics').insert([
          {
            name: `Música 1 da ${playlist.name}`,
            artist: 'Artista A',
            url: 'http://example.com/music1.mp3',
            md5Cover: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            playlistId,
            duration: 200,
          },
          {
            name: `Música 2 da ${playlist.name}`,
            artist: 'Artista B',
            url: 'http://example.com/music2.mp3',
            md5Cover: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            playlistId,
            duration: 250,
          },
          {
            name: `Música 3 da ${playlist.name}`,
            artist: 'Artista C',
            url: 'http://example.com/music3.mp3',
            md5Cover: 'cccccccccccccccccccccccccccccccc',
            playlistId,
            duration: 180,
          },
        ])
        break
    }
  }
}
