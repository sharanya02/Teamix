const sequelize = require('sequelize')
const db = require('../database/connection')

const schema = {
    teamId: {
        type: sequelize.UUID,
        primaryKey: true
    },
    teamName: {
        type: sequelize.STRING(255),
        allowNull: false
    },
    teammember: {
        type: sequelize.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: userId
        }

    },
}

const options = {
    timestamps: true
}
const Team = db.define('Team', schema, options)
module.exports = Team
