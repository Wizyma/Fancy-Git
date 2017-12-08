import * as path from 'path'
const Sequelize = require('sequelize')
const env = 'dev'
const config_path = path.join(process.cwd(), 'config.json')
const json = require(config_path)
const config = json.database.dev

export const db = new Sequelize(
    config.database,
    config.user,
    config.password, {
      host: config.hostname,
      dialect: config.driver,
    },
)
