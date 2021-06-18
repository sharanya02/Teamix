const morgan = require('morgan')
const logger = require('./logger')

const logStream = {
  write: (message, encoding) => logger.info(message)
}
const log = morgan('common', { stream: logStream })

module.exports = log
