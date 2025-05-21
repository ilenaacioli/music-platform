export async function seed(knex) {
  await knex('musics').del()
  await knex('playlists').del()
  await knex('users').del()

  const users = [
    {
      id: 1,
      name: 'userAdmin',
      email: 'user@admin',
      password: '239ijofdwewfmsa',
    },
    {
      id: 2,
      name: 'userTest',
      email: 'user@test',
      password: '3nds83whr0sdofk',
    },
  ]

  for (const user of users) {
    await knex('users').insert(user)
  }

  const playlistsData = [
    {
      name: 'mpb',
      description: 'Clássicos que tocam a alma e o violão',
      editable: false,
      userId: 1,
    },
    {
      name: 'forró',
      description: 'Balança o esqueleto com clássicos do forró!',
      editable: false,
      userId: 1,
    },
    {
      name: 'brega',
      description: 'Amor sofrido, mas com muito estilo',
      editable: false,
      userId: 1,
    },
    {
      name: 'frevo',
      description: 'Levanta a sombrinha e vem pular!',
      editable: false,
      userId: 1,
    },
  ]

  for (const playlist of playlistsData) {
    const [playlistId] = await knex('playlists').insert(playlist)

    switch (playlist.name) {
      case 'mpb':
        await knex('musics').insert([
          {
            name: 'Paciência',
            artist: 'Lenine',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/c/a/6/0/ca6827786db7158a50ead1e704892304.mp3?hdnea=exp=1747753130~acl=/api/1/1/c/a/6/0/ca6827786db7158a50ead1e704892304.mp3*~data=user_id=0,application_id=42~hmac=3019ec19adbbdf7dbc311eac636b9a0ce75f7283a9f37f85c79d7878010ed604',
            md5Cover: '756bc2a772f9add6f3880402472595bd',
            playlistId,
            duration: 284,
          },
          {
            name: `Anunciação`,
            artist: 'Alceu Valença',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/1/d/a/0/1da88faa08901d08214b2eacdca1b60e.mp3?hdnea=exp=1747753207~acl=/api/1/1/1/d/a/0/1da88faa08901d08214b2eacdca1b60e.mp3*~data=user_id=0,application_id=42~hmac=fedf92112f4f547da0d0f0f115ce8fd5f2b06ded5cce3fa55799ac75c2f48df9',
            md5Cover: '6e5fe1b6eae44068ff6e1cbb6b9b1ccb',
            playlistId,
            duration: 294,
          },
          {
            name: `Chão de Giz`,
            artist: 'Zé Ramalho',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/1/f/0/0/1f0e78f45f55dc6fa562c805c876ac0f.mp3?hdnea=exp=1747753289~acl=/api/1/1/1/f/0/0/1f0e78f45f55dc6fa562c805c876ac0f.mp3*~data=user_id=0,application_id=42~hmac=c037feabc449c580fed146bfad54ea983f1175fd5e247dec5e6b9cef88cbe864',
            md5Cover: '84e615400e2b7f6ea202821d91ae1b83',
            playlistId,
            duration: 271,
          },
        ])
        break
      case 'forró':
        await knex('musics').insert([
          {
            name: `Tamborete de Forró`,
            artist: 'Santanna O Cantador',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/9/2/e/0/92eb502a4e3aa6ec7a0e9a7819593783.mp3?hdnea=exp=1747753361~acl=/api/1/1/9/2/e/0/92eb502a4e3aa6ec7a0e9a7819593783.mp3*~data=user_id=0,application_id=42~hmac=09450211491b2f312d3a5811f26646edda3ed81fd68194650a35fd9e584920ce',
            md5Cover: 'b909c239e85449aff917c68f06c0a6e1',
            playlistId,
            duration: 212,
          },
          {
            name: `Isso Aqui Tá Bom Demais`,
            artist: 'Xand Avião',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/c/e/f/0/cef0dbda9b91dfb51d1ab97082deb448.mp3?hdnea=exp=1747753435~acl=/api/1/1/c/e/f/0/cef0dbda9b91dfb51d1ab97082deb448.mp3*~data=user_id=0,application_id=42~hmac=b4119f4a7798522d8487e8cba492d7d68ccfa17c7633ddba0951db153900332e',
            md5Cover: '29390b70c5453917028f67a9bff79924',
            playlistId,
            duration: 164,
          },
          {
            name: `Se For Amor`,
            artist: 'João Gomes',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/7/9/1/0/791800f749a4a28ba11c0fb874c5cdba.mp3?hdnea=exp=1747753573~acl=/api/1/1/7/9/1/0/791800f749a4a28ba11c0fb874c5cdba.mp3*~data=user_id=0,application_id=42~hmac=e7f2033e703f4ec1aecfeb6bc3c58a7b181e00f566f01ab6e15fa2f69fca906a',
            md5Cover: '2fae78d6bead261c21635c21de46dbd1',
            playlistId,
            duration: 239,
          },
        ])
        break
      case 'brega':
        await knex('musics').insert([
          {
            name: `Garçom`,
            artist: 'Reginaldo Rossi',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/b/3/3/0/b33f0ae39d55a9eb648169b08a8854b6.mp3?hdnea=exp=1747753687~acl=/api/1/1/b/3/3/0/b33f0ae39d55a9eb648169b08a8854b6.mp3*~data=user_id=0,application_id=42~hmac=d119f2e7b40fd1dc3f2cbce9e80d8cf5edd38d8e4515176cc99fa9acb43c3d39',
            md5Cover: '034a27ab172d71bc69ece827a6dd43e0',
            playlistId,
            duration: 201,
          },
          {
            name: `Espelho do Poder (Ao Vivo)`,
            artist: 'Conde Só Brega',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/7/7/8/0/778dede071ef1cd1e2a52d692d151c73.mp3?hdnea=exp=1747753865~acl=/api/1/1/7/7/8/0/778dede071ef1cd1e2a52d692d151c73.mp3*~data=user_id=0,application_id=42~hmac=278e3f71343f6ede032da5e64c44016f416e3ac946a71d673a349347a71c5c54',
            md5Cover: '954cb5af270fbd3b22bce9229d21f732',
            playlistId,
            duration: 118,
          },
          {
            name: `Borbulhas de Amor (Tenho um Coração) [Borbujas de Amor]`,
            artist: 'Fagner',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/2/d/4/0/2d4f48f5733a8cf34167fbcde2b744a2.mp3?hdnea=exp=1747754180~acl=/api/1/1/2/d/4/0/2d4f48f5733a8cf34167fbcde2b744a2.mp3*~data=user_id=0,application_id=42~hmac=e3f1aee7c44532f59e7c2c5b1b430fb8fb7dd77887721102061fe1a4a1200a14',
            md5Cover: '5da43cab5110bf4f0f5fc3eec696d2aa',
            playlistId,
            duration: 249,
          },
        ])
        break
      case 'frevo':
        await knex('musics').insert([
          {
            name: `Voltei, Recife (Ao vivo)`,
            artist: 'Alceu Valença',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/a/1/7/0/a17cfe19a1c129ef136c6eafeef75dff.mp3?hdnea=exp=1747754265~acl=/api/1/1/a/1/7/0/a17cfe19a1c129ef136c6eafeef75dff.mp3*~data=user_id=0,application_id=42~hmac=4afe145ad89925aa3edb4713bb1931c7d23382b69ad532c1aca0972ca5796cbf',
            md5Cover: 'fcd6a5fdeb6875a04d45c7722ea65502',
            playlistId,
            duration: 220,
          },
          {
            name: `Banho de Cheiro (Ao Vivo)`,
            artist: 'Alceu Valença',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/1/d/5/0/1d577172ce312dfc8b40856276771360.mp3?hdnea=exp=1747754334~acl=/api/1/1/1/d/5/0/1d577172ce312dfc8b40856276771360.mp3*~data=user_id=0,application_id=42~hmac=2e173e01757be5f19580a9217321540072de9f697a5c534bf909309c44c473d7',
            md5Cover: '2e0ae3cbbdb65d03840e9f87a1e3f700',
            playlistId,
            duration: 161,
          },
          {
            name: `Hino do elefante de Olinda`,
            artist: 'Claudionor Germano',
            url: 'https://cdnt-preview.dzcdn.net/api/1/1/b/2/9/0/b29aa36a83b499a1b611c6d6764663d4.mp3?hdnea=exp=1747754417~acl=/api/1/1/b/2/9/0/b29aa36a83b499a1b611c6d6764663d4.mp3*~data=user_id=0,application_id=42~hmac=d525063126b5977720da4a4a2d4cbd8a53c1a09f82b13d698e23ea91281aaea9',
            md5Cover: '74b6439cd0552a25b819289198b9f138',
            playlistId,
            duration: 168,
          },
        ])
        break
    }
  }
}
