import { BaseController, Route, Config } from './base'
import { Router, Request, Response, NextFunction } from 'express'
import { db as User } from '../models/index'
import { passport, ensureAuthenticated } from '../github/authentification'

export class FavoritesRoutes extends BaseController {

  constructor() {
    super()
  }

  static routes: Route[] = [
    { verb: 'get', path: '/getuser', action: 'getUserPosts' },
    { verb: 'post', path: '/managefav', action: 'managefavorite' },
  ]
  
  private getUserPosts = (req: Request | any, res: Response) => {
    console.log(req.query)
    const { id } = req.query
    User.models.Favorites.findAll({ where : { UserID: id } })
        .then((result: any) => {
          console.log(result)
          if (result.length >= 1) {
            return res.json(result.dataValues)
          }
          return res.send('No values Found')
        }) 
  }

  private managefavorite = (req: Request, res: Response) => {
    const { id, login, repo } = req.body.params
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
