import { Request, Response, NextFunction, Router } from 'express'

export interface Route {
  path: string,
  action: string,
  verb: string,
}

export interface Config {
  uri: string,
  token: string,
  medium_token: string,
  database?: {
    dev?: {
      driver: string,
      user: string,
      database: string,
      password: string,
      hostname: string,
    },
  
    production?: {
      driver: string,
      user: string,
      database: string,
      password: string,
      hostname: string,
    },
  }
}


export abstract class BaseController {
  static routes: Route[] = []

  public req: Request
  public res: Response

  static connect(router: any, instance: any) {
    const routes = []
    for (const idx in this.routes) {
      routes.push(this.routes[idx])
    }

    const rt: Router[] = routes.map((route: Route) => {
      return router[route.verb](route.path, (req: Request, res: Response) => {
        instance[route.action](req, res)
      })
    })

    return rt
  }
}
