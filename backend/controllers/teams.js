const logger = require('../logging/logger')
const uuid4 = require('uuid4')
const Team = require('../models/teams')
const User = require('../models/users')
const UserTeams = require('../models/userTeam')

class TeamController {
  static async createTeam (userId, teamName) {
    try {
      const exist = await User.findOne({ where: { userId: userId } })
      if (!exist) {
        return {
          error: true,
          message: 'No such user found',
          code: 404
        }
      }
      const team = {
        teamId: uuid4(),
        teamName: teamName,
        userId: userId
      }
      const userteam = {
        TeamTeamId: team.teamId,
        UserUserId: userId,
        isHost: true
      }

      const newTeam = await Team.create(team)
      await UserTeams.create(userteam)

      return {
        error: false,
        message: 'Team Successfully Created',
        code: 201,
        team: newTeam
      }
    } catch (err) {
      logger.error('An error occurred' + err)
      return {
        error: true,
        message: 'An Error Occurred' + err,
        code: 500
      }
    }
  }

  static async addUser (userId, teamId) {
    try {
      const team = await Team.findOne({ where: { teamId } })
      if (!team) {
        return {
          error: true,
          message: 'No such team exists',
          code: 404
        }
      }
      const exists = await UserTeams.findOne({ where: { UserUserId: userId } })
      if (exists) {
        return {
          error: true,
          message: 'User exists in team',
          code: 409
        }
      }
      const userteam = {
        TeamTeamId: teamId,
        UserUserId: userId

      }
      const newUser = await UserTeams.create(userteam)
      return {
        error: false,
        message: 'Member added successfully',
        code: 201,
        user: newUser
      }
    } catch (err) {
      logger.error('An error occurred' + err)
      return {
        error: true,
        message: 'An Error Occurred' + err,
        code: 500
      }
    }
  }

  static async joinTeam (userId, teamId) {
    try {
      const team = await Team.findOne({ where: { teamId } })
      if (!team) {
        return {
          error: true,
          message: 'No such team exists',
          code: 404
        }
      }
      const exists = await UserTeams.findOne({ where: { UserUserId: userId, TeamTeamId: teamId } })
      if (exists) {
        return {
          error: true,
          message: 'User already exists in team',
          code: 409
        }
      }
      const userteam = {
        UserUserId: userId,
        TeamTeamId: teamId
      }
      const newUser = await UserTeams.create(userteam)
      return {
        error: false,
        message: 'Team joined successfully',
        code: 201,
        user: newUser
      }
    } catch (err) {
      logger.error('An error occurred' + err)
      return {
        error: true,
        message: 'An Error Occurred' + err,
        code: 500
      }
    }
  }

  static async removeTeam (userId, teamId) {
    try {
      const team = await Team.findOne({ where: { teamId } })
      if (!team) {
        return {
          error: true,
          message: 'No such team exists',
          code: 404
        }
      }
      const host = await UserTeams.findOne({ where: { UserUserId: userId } })
      if (host.isHost === true) {
        return {
          error: true,
          message: 'Only host can delete a team',
          code: 409
        }
      }
      Team.destroy({
        where: {
          teamId: teamId
        }
      })

      UserTeams.destroy({
        where: {
          TeamTeamId: teamId
        }
      })
      return {
        error: false,
        message: 'Team deleted successfully',
        code: 201
      }
    } catch (err) {
      logger.error('An error occurred' + err)
      return {
        error: true,
        message: 'An Error Occurred' + err,
        code: 500
      }
    }
  }

  static async removeUser (hostId, userId, teamId) {
    try {
      const team = await Team.findOne({ where: { teamId } })
      if (!team) {
        return {
          error: true,
          message: 'No such team exists',
          code: 404
        }
      }
      const exists = await UserTeams.findOne({
        where: {
          UserUserId: userId,
          TeamTeamId: teamId
        }
      })
      if (!exists) {
        return {
          error: true,
          message: 'User does not exist in team',
          code: 404
        }
      }
      const host = await UserTeams.findOne({ where: { UserUserId: hostId } })
      if (host.isHost === false) {
        return {
          error: true,
          message: 'Only host can delete a team',
          code: 409
        }
      }
      UserTeams.destroy({
        where: {
          TeamTeamId: teamId,
          UserUserId: userId
        }
      })
      return {
        error: false,
        message: 'User removed from Team successfully',
        code: 201
      }
    } catch (err) {
      logger.error('An error occurred' + err)
      return {
        error: true,
        message: 'An Error Occurred' + err,
        code: 500
      }
    }
  }

  static async fetchTeam (teamId) {
    try {
      const query = {
        where: {
          teamId: teamId
        },
        include:
          [
            {
              all: true
            }
          ]
      }
      const team = await Team.findOne(query)
      if (!team) {
        return {
          error: true,
          message: 'No such team found',
          code: 404
        }
      }
      return {
        error: false,
        message: 'Team details fetched successfully',
        code: 200,
        team: team
      }
    } catch (err) {
      logger.error('An error occurred' + err)
      return {
        error: true,
        message: 'An Error Occurred' + err,
        code: 500
      }
    }
  }
}
module.exports = TeamController
