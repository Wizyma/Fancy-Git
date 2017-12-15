import React, { Component } from 'react'
import { Ul, Alog, Li, Nav as NavLink } from '../styles/globals'

export class Nav extends Component {
    constructor(props){
        super(props)

        this.state = {
            isLogged: null
        }
    }


    componentDidMount(){
        this.setState({isLogged: localStorage.getItem('logged')})
    }

    render(){
        const { isLogged } = this.state
        console.log(isLogged)
        return(
            <Ul className="nav">
            <Li>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
            </Li>
            <Li>
                <NavLink activeClassName="active" to="/popular">Popular</NavLink>
            </Li>
            <Li>
                <NavLink activeClassName="active" to="/search">Search</NavLink>
            </Li>
            <Li>
                <NavLink activeClassName="active" to="/profile">Profile</NavLink>
            </Li>
            <Li>
                {isLogged === 'true' ? <Alog href='http://localhost:1339/logout'>Sign Out</Alog> : <Alog href='http://localhost:1339/login'>Login</Alog>}
            </Li>
        </Ul>
        )
    }
}
