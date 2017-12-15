import { BaseController, Route, Config } from './base'
import { Router, Request, Response } from 'express'
import { passport, ensureAuthenticated } from '../github/authentification'

export class Github extends BaseController {
  constructor() {
    super()

  }

  static routes: Route[] = [
    { verb: 'get', path: '/login', action: 'authenticate', 
      middleware: passport.authenticate('github', 
        { scope: ['user:email', 'user:follow', 'repo', 'public_repo'] }) },
    { verb: 'get', path: '/logout', action: 'logout' },
    { verb: 'get', path: '/logged', action: 'logged', 
      middleware: passport.authenticate('github', 
        { failureRedirect: '/login',
          successFlash: 'Welcome!' }) },
  ]
  
  private authenticate = (req: Request, res: Response) => {
    // the middleware handle this route
  }

  private logged = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      return res.redirect(`http://localhost:8080/?token=${req.user.accessToken}&user=${req.user.userid}`)
    }

    res.redirect('/login')
  }

  private logout = (req: Request | any, res: Response) => {
    req.logout()
    res.redirect('http://localhost:8080/')
  }
}
