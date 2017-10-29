import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Nav } from './nav'
import { Home } from './home'
import { Repo } from './subcomponents/repo'
import { MainDiv } from '../styles/globals'

export class App extends React.Component {
  render() {
    return(
    <Router>
        <MainDiv className="container">
            <Nav />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/repo" component={Repo}/>
                <Route render={() => <p>Not found</p>} />
            </Switch>
        </MainDiv>
    </Router>
    )
  }
}
