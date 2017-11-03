const Sequelize = require('sequelize')
const env = 'dev'
const config = require('./../../config.json').base[env]

export const db = new Sequelize(
  config.database,
  config.user,
  config.password, {
    host: config.hostname,
    dialect: 'mysql',
  },
)

