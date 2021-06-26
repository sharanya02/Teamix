const jwt = require('jsonwebtoken')
const logger = require('../logging/logger')

exports.isLoggedIn = (req, res, next) => {
  const tokenHeader = req.header('Authorization')
  if (!tokenHeader) {
    logger.warn('Access Denied')
    const response = {
      error: true,
      message: 'Access is denied',
      code: 401
    }
    return res.status(response.code).send(response)
  }
  try {
    const token = tokenHeader.split(' ')
    req.decoded = jwt.verify(token[1], process.env.SECRET_KEY)
    next()
  } catch (err) {
    logger.error(err.message.toString())
    const response = {
      error: true,
      message: 'Token is invalid',
      code: 400
    }
    return res.status(response.code).send(response)
  }
}
