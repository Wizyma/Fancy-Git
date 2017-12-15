import { BaseController, Route, Config } from './base'
import { Router, Request, Response, NextFunction } from 'express'
import { db as User } from '../models/index'
import { passport, ensureAuthenticated } from '../github/authentification'

export class FavoritesRoutes extends BaseController {

  constructor() {
    super()
  }

  static routes: Route[] = [
    { verb: 'get', path: '/getuser', action: 'getuser' },
    { verb: 'post', path: '/managefav', action: 'managefavorite' },
  ]
  
  private getuser = (req: Request, res: Response) => {
    const { id } = req.body.params
    User.models.Favorites.findAll({ where : { UserID: id } })
        .then((result: any) => {
          res.json(result)
        }) 
  }

  private managefavorite = (req: Request, res: Response) => {
    const { id, login, repo } = req.body.params
    console.log(req.isAuthenticated())
    User.models.Favorites.findOrCreate({ where : { UserID: id, RepoName: repo, RepoUser: login }, defaults: { UserID: id, RepoName: repo, RepoUser: login } })
        .spread((results: any, created: boolean) => {
          if (!created) {
            return User.models.Favorites.destroy({ where : { UserID: id, RepoName: repo, RepoUser: login } })
                .then((a: any) => {
                  console.log(a)
                  res.json({ success: true, destroy: true })
                })
          }
          return res.json({ success: true, destroy: false })
        })
  }
}
