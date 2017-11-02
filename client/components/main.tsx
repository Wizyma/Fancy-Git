import * as React from 'react'
import * as Browser from 'react-router-dom'
import { Nav } from './nav'
import { Home } from './home'
import { Repo } from './subcomponents/repo'
import { MainDiv } from '../styles/globals'
import { Search } from './search'

const Router = Browser.Router
const Route = Browser.Route
const Switch = Browser.Switch


export class App extends React.Component<any, any>{
  render() {
    return(
    <Router history>
        <MainDiv className="container">
            <Nav />
            <Switch>
                <Route exact path="/" render={(props: any) => (<Home options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} url="/"/>)}/>
                <Route exact path="/repo"  render={(props: any) =>  <Repo /> } /> {/* repo needs default props */}
                <Route exact path="/search"  render={(props: any) => (<Search options={[{ REPOSITORY: 'Repositories' }, { USER: 'Users' }]} />)}/>
                <Route render={() => <p>Not found</p>} />
            </Switch>
        </MainDiv>
    </Router>
    )
  }
}
