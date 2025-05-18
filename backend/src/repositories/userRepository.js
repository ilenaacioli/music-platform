import db from '../db.js'

export class UserRepository {
  constructor() {}

  getByEmail = async (email) => {
    const user = await db('users').where({ email }).first()
    return user
  }

  create = async (email, name, password) => {
    const user = await db('users').insert({ email, name, password })
    return user
  }
}
