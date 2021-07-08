exports.migrations = async () => {
  try {
    const User = require('./users')
    const Team = require('./teams')
    const Post = require('./posts')
    const UserTeams = require('./userTeam')

    User.belongsToMany(Team, { through: UserTeams })
    Team.belongsToMany(User, { through: UserTeams })
    User.hasMany(Post, { foreignKey: 'userId' })
    Post.belongsTo(User, {foreignKey: 'userId'})
    Team.hasMany(Post, { foreignKey: 'teamId' })

    await Team.sync({ alter: true })
    await User.sync({ alter: true })
    await Post.sync({ alter: true })
    await UserTeams.sync({ alter: true })
  } catch (err) {
    throw new Error(err)
  }
}
