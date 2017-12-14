import React, { Component } from 'react'
import { api } from '../utils/api'
import { ContainerFull, GlobalDiv } from '../styles/globals'

export class Home extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
        const { search } = this.props.location
        if(search && search !== ""){
            const token = search.split('=')[1]
            localStorage.setItem('token', `bearer ${token}`)
        }
    }

    render(){
        return(
            <GlobalDiv>
                <ContainerFull>
                    <a href='http://localhost:1339/login'>Login</a>
                    {this.props.children}
                </ContainerFull>
            </GlobalDiv>
        )
    }
}