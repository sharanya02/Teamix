const logger = require('../logging/logger')
const uuid4 = require('uuid4')
const Team = require('../models/teams')
const UserTeams = require('../models/userTeam')
const Post = require('../models/posts')

class PostController {
  static async createPost (userId, teamId, postContent) {
    try {
      const team = await Team.findOne({ where: { teamId } })
      if (!team) {
        return {
          error: true,
          message: 'No such team exists',
          code: 404
        }
      }
      const exist = await UserTeams.findOne({
        where: {
          UserUserId: userId,
          TeamTeamId: teamId
        }
      })
      if (!exist) {
        return {
          error: true,
          message: 'No such user in the team found',
          code: 404
        }
      }
      const post = {
        postId: uuid4(),
        postContent: postContent,
        userId: userId,
        teamId: teamId
      }

      const newPost = await Post.create(post)
      return {
        error: false,
        message: 'Post Successfully Created',
        code: 201,
        post: newPost
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

  static async deletePost (userId, postId) {
    try {
      const post = await Post.findOne({ where: { postId } })
      if (!post) {
        return {
          error: true,
          message: 'No such post exists',
          code: 404
        }
      }
      const author = await Post.findOne({ where: { userId: userId } })
      if (!author) {
        return {
          error: true,
          message: 'Only post author can delete a post'
        }
      }
      Post.destroy({
        where: {
          postId: postId
        }
      })
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

module.exports = PostController
