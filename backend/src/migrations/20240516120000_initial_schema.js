exports.up = function (knex) {
    return knex.schema
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
        table.boolean('editable').notNullable().defaultTo(false)
        table.timestamps(true, true)
      })
      .createTable('music', (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('artist').notNullable()
        table.string('url').notNullable()
        table
          .integer('playlistId')
          .unsigned()
          .references('id')
          .inTable('playlists')
        table.integer('duration') 
        table.timestamps(true, true)
      })
  }
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('favorites')
      .dropTableIfExists('music')
      .dropTableIfExists('playlists')
      .dropTableIfExists('users')
  }