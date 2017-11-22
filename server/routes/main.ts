import { BaseController, Route, Config } from './base'
import { Router, Request, Response } from 'express'
import axios from 'axios'
import * as path from 'path'

export class Main extends BaseController {
  private config_path: string
  private config: Config

  constructor(){
    super()

    this.config_path = path.join(process.cwd(), 'config.json')
    this.config = require(this.config_path)
  }

  static routes: Route[] = [
    { verb: 'get', path: '/token', action: 'index' },
    { verb: 'get', path: '/mediumtoken', action: 'medium' },
  ]
  
  private index = (req: Request, res: Response) => {
    res.json({ token: this.config.token })
  }

  private medium = (req: Request, res: Response) => {
    res.json({ medium: this.config.medium_token })
  }
}
