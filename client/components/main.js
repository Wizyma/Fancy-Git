import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Nav } from './nav'
import Popular from './popular'
import Repo from './repo'
import { MainDiv } from '../styles/globals'
import { Search } from './search'
import { User } from './user'
import { Home } from './home'
import { Profile } from './profile'

const PrivateRoute = ({ component: Component, path }) => (
    <Route path={path} render={props => (
      localStorage.getItem('logged') === 'true' ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
)


export class App extends React.Component {
  render() {
    return(
      
    <div>
        <MainDiv className="container">
        
            <Nav />
           
            <Switch>
                <Route exact path="/"  component={Home} />
                <Route exact path="/popular" render={() => (<Popular options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} url="/"/>)}/>
                <Route exact path="/repo"  component={Repo} />
                <Route exact path="/user"  component={User} />
                <Route exact path="/search"  render={() => (<Search options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} />)}/>
                <PrivateRoute path="/profile" component={Profile}/>
                <Route render={() => <p>Not found</p>} />
            </Switch>
        </MainDiv>
    </div>
    )
  }
}
