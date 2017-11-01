import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Nav } from './nav'
import { Home } from './home'
import { Repo } from './subcomponents/repo'
import { MainDiv } from '../styles/globals'
import { Search } from './search'

export class App extends React.Component {
  render() {
    return(
    <Router>
        <MainDiv className="container">
            <Nav />
            <Switch>
                <Route exact path="/" render={(props: any) => (<Home options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} url="/"/>)}/>
                <Route exact path="/repo" component={Repo}/> {/* repo needs default props */}
                <Route exact path="/search"  render={(props: any) => (<Search options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} />)}/>
                <Route render={() => <p>Not found</p>} />
            </Switch>
        </MainDiv>
    </Router>
    )
  }
}
