import { NextFunction } from 'express-serve-static-core'
import * as passport from 'passport'
import * as path from 'path'
import { Config } from '../routes/base'
import { db as User } from '../models/index'
const GitHubStrategy = require('passport-github2').Strategy

const config_path: string = path.join(process.cwd(), 'config.json')
const config: Config = require(config_path)

passport.use(new GitHubStrategy({
  clientID: config.gitClientId,
  clientSecret: config.gitSecret,
  callbackURL: 'https://415ed58f.ngrok.io/logged',
  passReqToCallback : true,
},
(req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
  console.log(done)
  return User.models.Favorites.findOrCreate({ where: { UserID: profile.id }, defaults: { UserID: profile.id } })
  .spread((user: any, created: any) => {
    return done(null, profile)
  })
}))

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser((user: any, done: any) => {
  done(null, user)
})
  
passport.deserializeUser((obj: any, done: any) => {
  done(null, obj)
})

const ensureAuthenticated = (req: Express.Request, res: Express.Response | any, next: NextFunction) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/login')
}

export { passport, ensureAuthenticated }
