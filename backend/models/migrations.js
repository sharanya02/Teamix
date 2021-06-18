exports.migrations = async () => {
  try {
    const User = require('./users')
    const Team = require('./teams')
    const Post = require('./posts')

    User.hasMany(Team, { foreignKey: 'userId' });
    Team.hasMany(User, { foreignKey: 'teamId' });
    User.hasMany(Post, { foreignKey: 'userId' });
    Team.hasMany(Post, { foreignKey: 'teamId' });

    await User.sync({ alter: true })
    await Team.sync({ alter: true })
    await Post.sync({ alter: true })

  } catch (err) {
    throw new Error(err)
  }
}
