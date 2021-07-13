const sequelize = require('sequelize')
const db = require('../database/connection')

const schema = {
  postId: {
    type: sequelize.UUID,
    primaryKey: true
  },
  postContent: {
    type: sequelize.STRING(255),
    allowNull: false
  },
  like: {
    type: sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  isMeeting: {
    type: sequelize.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId'
    }
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
const Post = db.define('Posts', schema, options)
module.exports = Post
