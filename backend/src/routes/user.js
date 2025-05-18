import express from 'express'
const router = express.Router()

import { GetByEmailUsecase } from '../usecases/user/getByEmailUsecase.js'
import { GetByEmailController } from '../controllers/user/getByEmailController.js'
import { UserRepository } from '../repositories/userRepository.js'
import { CreateUserUsecase } from '../usecases/user/createUserUsecase.js'
import { CreateUserController } from '../controllers/user/createUserController.js'

const userRepository = new UserRepository()

// GET /user
const getByEmailUsecase = new GetByEmailUsecase(userRepository)
const getByEmailController = new GetByEmailController(getByEmailUsecase)
router.get('/user', (req, res) => getByEmailController.handle(req, res))

// POST /user
const createUserUsecase = new CreateUserUsecase(userRepository)
const createUserController = new CreateUserController(createUserUsecase)
router.post('/user', (req, res) => createUserController.handle(req, res))

export default router
