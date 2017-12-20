import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'
import * as cors from 'cors'
import * as passport from 'passport'
import { Main } from './routes/main'
import { Github } from './routes/github'
import { FavoritesRoutes } from './routes/database'
// import * as cookieParser from 'cookie-parser' use later
const mediumServer = require('medium-graphql').default
const session = require('express-session')
const flash = require('connect-flash')
import { dbConnect } from './models/index'

interface ServerOptions {
  readonly port?: number
}

/**
 *  Create our web server
 * 
 * @export
 * @class Server
 */
export class Server {

  public options: ServerOptions
  public app: express.Application

  constructor(options: ServerOptions) {
    const defaults: ServerOptions = {
      port: 8080,
    }

    this.options = { ...defaults, ...options }

    this.app = express()

    this.config()
  }

  /**
   * Configure initial middlewares
   * 
   * @memberof Server
   */
  private config() {
    this.app.use(logger('dev'))

    this.app.use('*', cors())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(session({ secret: 'fancygit', path: '*', resave: true, saveUninitialized: true, unset: 'destroy', maxAge: 360000000 }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(flash())
    this.router()

    dbConnect()

    this.app.use('/graphql', mediumServer)
    this.app.use(this.notFoundMiddleware)
  }

  /**
   * Launch the web server
   * 
   * @memberof Server
   */
  public run() {
    this.app.listen(this.options.port, () => {
      console.log(`Started on port ${this.options.port}`)
    })
  }

  public router() {
    const router = express.Router()

    // main routes
    const main = new Main()
    const mainRoutes = Main.connect(router, main)

    // github routes
    const git = new Github()
    const gitRoutes = Github.connect(router, git)

    // Favorites
    const favs = new FavoritesRoutes()
    const favRoutes = FavoritesRoutes.connect(router, favs)

    this.app.use(mainRoutes)
    this.app.use(gitRoutes)
    this.app.use(favRoutes)
  }

  /**
   * Middleware to be used when no middleware has handled the request
   * 
   * @private
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   * @memberof Server
   */
  private notFoundMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    res.statusCode = 404
    res.sendFile(path.resolve(__dirname, 'template/notfound.html'))
  }
}
