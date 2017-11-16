import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Nav } from './nav'
import { Popular } from './popular'
import { Repo } from './repo'
import { MainDiv } from '../styles/globals'
import { Search } from './search'

export class App extends React.Component {
  render() {
    return(
    <Router>
        <MainDiv className="container">
            <Nav />
            <Switch>
                <Route exact path="/popular" render={() => (<Popular options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} url="/"/>)}/>
                <Route exact path="/repo"  component={Repo} />
                <Route exact path="/search"  render={() => (<Search options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} />)}/>
                <Route render={() => <p>Not found</p>} />
            </Switch>
        </MainDiv>
    </Router>
    )
  }
}
