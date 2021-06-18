const logger = require('../logging/logger')
const uuid4 = require('uuid4')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {
  static async login (email, password) {
    try {
      const exists = await User.findOne({ where: { email: email } })
      if (!exists) {
        return {
          error: true,
          code: 404,
          message: 'User does not exist'
        }
      }
      const pass = await bcrypt.compare(password, exists.userPassword)
      if (!pass) {
        return {
          error: true,
          code: 401,
          message: 'Incorrect password'
        }
      }
      const token = jwt.sign({
        id: exists.userId
      }, process.env.SECRET_KEY)
      exists.userPassword=null
      return {
        error: false,
        code: 200,
        message: 'User Logged In',
        data: exists,
        jwt: token
      }
    } catch (err) {
      logger.error(err.toString())
      return {
        error: true,
        code: 500,
        message: err.toString()
      }
    }
  }

  static async signup (email, password, username) {
    try {
      const exists = await User.findOne({ where: { email: email } })
      if (exists) {
        return {
          error: true,
          code: 409,
          message: 'User already exists'
        }
      }
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
      const pass = await bcrypt.hash(password, salt)
      const user = {
        userId: uuid4(),
        userName: username,
        email: email,
        userPassword: pass
      }
      const createdUser = await User.create(user)
      const token = jwt.sign({
        id: createdUser.userId
      }, process.env.SECRET_KEY)
     createdUser.userPassword=null
      return {
        error: false,
        code: 201,
        message: 'User Created',
        data: createdUser,
        jwt: token
      }
    } catch (err) {
      logger.error(err.toString())
      return {
        error: true,
        code: 500,
        message: err.toString()
      }
    }
  }
}

module.exports = UserController
