const sequelize = require('sequelize')
const db = require('../database/connection')

const schema = {
  userId: {
    type: sequelize.UUID,
    primaryKey: true
  },
  userName: {
    type: sequelize.STRING(255),
    allowNull: false
  },
  email: {
    type: sequelize.STRING(255),
    allowNull: false,
    isEmail: true
  },
  userPassword: {
    type: sequelize.STRING(255),
    allowNull: false
  }
}

const options = {
  timestamps: true
}
const User = db.define('User', schema, options)
module.exports = User
