import { BaseController, Route } from './base'
import { Router, Request, Response } from 'express'
import axios from 'axios'
import * as path from 'path'

// test class for toutes
export class Main extends BaseController {

  static routes: Route[] = [
    { verb: 'get', path: '/token', action: 'index' },
  ]
  
  private index = (req: Request, res: Response) => {
    const config_path = path.join(process.cwd(), 'config.json')
    const config = require(config_path)

    res.json({ token: config.token })
  }
}
