import * as React from 'react'
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
                <Route exact path="/popular" render={(props: any) => (<Popular options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} url="/"/>)}/>
                <Route exact path="/repo"  component={Repo as any} />
                <Route exact path="/search"  render={(props: any) => (<Search options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} />)}/>
                <Route render={() => <p>Not found</p>} />
            </Switch>
        </MainDiv>
    </Router>
    )
  }
}
