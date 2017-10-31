import { BaseController, Route } from './base'
import { Router } from 'express'


// test class for toutes
export class Main extends BaseController {

  static routes: Route[] = [
    { verb: 'get', path: '/', action: 'index' },
    { verb: 'post', path: '/post', action: 'create' },
  ]
  
  private index = (req, res) => {
    res.end('Voila')
  }
}
