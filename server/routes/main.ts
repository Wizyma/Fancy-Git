import { BaseController, Route, Config } from './base'
import { Router, Request, Response, NextFunction } from 'express'
import * as path from 'path'

export class Main extends BaseController {
  private config_path: string
  private config: Config

  constructor() {
    super()

    this.config_path = path.join(process.cwd(), 'config.json')
    this.config = require(this.config_path)
  }

  static routes: Route[] = [
    { verb: 'get', path: '/token', action: 'index' },
  ]
  
  private index = (req: Request, res: Response) => {
    res.json({ token: this.config.token })
  }
}
