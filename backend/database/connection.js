const Sequelize = require('sequelize')
const dotEnv = require('dotenv')

dotEnv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

module.exports = sequelize
