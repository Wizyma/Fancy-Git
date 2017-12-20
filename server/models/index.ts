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

export const dbConnect = () => {
  db.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch((err: any) => {
      console.error('Unable to connect to the database:', err)
    })

  db.import('./favorites')

  db.sync({ force: true })
    .then(() => {
      console.log('Tables created !')
    })
    .catch((err: any) => {
      console.error('Error when create tables : ', err)
    })
}