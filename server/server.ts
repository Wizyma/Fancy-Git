import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'
// import * as cookieParser from 'cookie-parser' use later


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

  constructor (options: ServerOptions) {
    const defaults: ServerOptions = {
      port: 8080,
    }

    this.options = { ...defaults, ...options }

    this.app = express()
    console.log(this.app)
    this.config()

    this.app.use(this.notFoundMiddleware)
  }

  /**
   * Configure initial middlewares
   * 
   * @memberof Server
   */
  public config () {
    this.app.use(logger('dev'))

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded())
  }

  /**
   * Launch the web server
   * 
   * @memberof Server
   */
  public run () {
    this.app.listen(this.options.port, () => {
      console.log(`Started on port ${this.options.port}`)
    })
  }

  public router () {
    const router = express.Router()

    this.app.use(router)
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
    res.end('Not found!!')
  }
}
