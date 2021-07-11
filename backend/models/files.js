const sequelize = require('sequelize')
const db = require('../database/connection')

const schema = {
  fileId: {
    type: sequelize.UUID,
    primaryKey: true
  },
  fileName: {
    type: sequelize.STRING(255),
    allowNull: false
  },
  fileContent: {
    type: sequelize.STRING,
    allowNull: false,
  },
  teamId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'Teams',
      key: 'teamId'
    }
  }
}

const options = {
  timestamps: true
}
const File = db.define('Files', schema, options)
module.exports = File
