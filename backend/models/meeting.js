const sequelize = require('sequelize')
const db = require('../database/connection')

const schema = {
  meetingId: {
    type: sequelize.UUID,
    primaryKey: true
  },
  teamName: {
    type: sequelize.STRING(255),
    allowNull: false
  }
}

const options = {
  timestamps: true
}
const Team = db.define('Teams', schema, options)
module.exports = Team
