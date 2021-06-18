const winston = require('winston')

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: 'silly',
      handleExceptions: 'true',
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  ]
})

module.exports = logger
