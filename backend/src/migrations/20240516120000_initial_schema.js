export async function up(knex) {
  await knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.timestamps(true, true)
    })
    .createTable('playlists', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.text('description')
      table.boolean('editable').notNullable().defaultTo(true)
      table.timestamps(true, true)
    })
    .createTable('musics', (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('artist').notNullable()
      table.string('url', 2048).notNullable()
      table.string('md5Cover', 32).notNullable()
      table
        .integer('playlistId')
        .unsigned()
        .references('id')
        .inTable('playlists')
        .onDelete('SET NULL')
      table.integer('duration')
      table.timestamps(true, true)
    })
}

export async function down(knex) {
  await knex.schema
    .dropTableIfExists('favorites')
    .dropTableIfExists('musics')
    .dropTableIfExists('playlists')
    .dropTableIfExists('users')
}
