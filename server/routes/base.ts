import { Request, Response, NextFunction, Router } from 'express'

export interface Route {
  path: string,
  action: string,
  verb?: string,
}

export abstract class BaseController {
  static routes: Route[] = []

  public req: Request
  public res: Response

  static connect(router: Router) {
    for (const idx in this.routes) {
      const route = this.routes[idx]
    }
  }
}
