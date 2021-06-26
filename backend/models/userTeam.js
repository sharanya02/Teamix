const sequelize = require('sequelize')
const db = require('../database/connection')

const schema = {
  isHost: {
    type: sequelize.BOOLEAN,
    defaultValue: false
  }
}

const options = {
  timestamps: false
}

const UserTeams = db.define('User_Teams', schema, options)
module.exports = UserTeams
