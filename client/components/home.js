import React, { Component } from 'react'
import { api } from '../utils/api'
import { ContainerFull, GlobalDiv } from '../styles/globals'

export class Home extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount(){
        const { search } = this.props.location
        if(search && search !== ""){
            if(search.split('=')[0].split('?')[1] === 'delogged'){
                localStorage.setItem('logged', 'false')
                localStorage.removeItem('user')
                return api.getToken()
            }
            console.log('toto')
            const params = search.split('=')
            const token = search.split('=')[1].split('&')[0]
            localStorage.setItem('token', `bearer ${token}`)
            localStorage.setItem('user', params[2])
            localStorage.setItem('logged', 'true')
            

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