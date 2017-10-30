import { BaseController, Route } from './base'
import { Router } from 'express'


// test class for toutes
export class Main extends BaseController {

  static routes: Route[] = [
    { verb: 'get', path: '/', action: 'index' },
    { verb: 'post', path: '/post', action: 'create' },
    { verb: 'get', path: '/testStuff', action: 'index' },
  ]

  private getRoutes = (router: Router, routes: Route[]) => {
    const instance: Main = new Main()
    const rt: Router[] = routes.map((route: Route) => {
      return router[route.verb](route.path, (req, res) => {
        instance[route.action](req, res)
      })
    })

    return rt
  }

  static initRoutes = (): Function => {
    return new Main().getRoutes
  }
  
  private index = (req, res) => {
    res.end('Voila')
  }
}
