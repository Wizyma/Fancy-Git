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

    handleLogin = (e) => {
        const { isLogged } = this.state
        if(isLogged === 'true'){
            return window.location = 'http://localhost:1339/logout'
        }

        return window.location = 'http://localhost:1339/login'
    }

    render(){
        const { isLogged } = this.state
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
                <Alog onClick={ this.handleLogin }>{isLogged === 'true' ? 'Sign Out': 'Login'}</Alog>
            </Li>
        </Ul>
        )
    }
}
