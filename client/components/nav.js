import React, { Component } from 'react'
import { Ul, Li, Nav as NavLink } from '../styles/globals'

export const Nav = (props) => console.log(props) || (
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
    </Ul>
)

