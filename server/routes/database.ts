import { BaseController, Route, Config } from './base'
import { Router, Request, Response, NextFunction } from 'express'
import { db as User } from '../models/index'

export class Main extends BaseController {

  constructor() {
    super()
  }

  static routes: Route[] = [
    { verb: 'get', path: '/getuser', action: 'getuser' },
    { verb: 'get', path: '/managefav', action: 'managefavorite' },
  ]
  
  private getuser = (req: Request, res: Response) => {
    User.models.Favorites.findAll({ where : { UserID: req.body.id } })
        .then((result: any) => {
          res.json(result)
        }) 
  }

  private managefavorite = (req: Request, res: Response) => {
    const { id, login, repo } = req.body
    User.models.Favorites.findOrCreate({ where : { UserID: id, RepoName: repo, UserName: login }, defaults: { UserID: id, RepoName: repo, UserName: login } })
        .spread((results: any, created: boolean) => {
          if (!created) {
            User.models.Favorites.destroy({ where : { UserID: id, RepoName: repo, UserName: login } })
                .then((a: any) => {
                  console.log(a)
                  res.json({ success: true })
                })
          }
          res.json({ success: true })
        })
  }
}
