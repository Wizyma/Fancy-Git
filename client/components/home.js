import React, { Component } from 'react'
import { api } from '../utils/api'
import { ContainerFull, GlobalDiv } from '../styles/globals'

export class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const { search } = this.props.location
        console.log(search)
        if (search && search !== "") {
            if (search.split('=')[0].split('?')[1] === 'delogged') {
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

    render() {
        return (
            <GlobalDiv>
                <ContainerFull>
                    <h1 style={{ textAlign: 'center' }} className='text-center'>Fancy Git</h1>
                    <p>Welcome on Fancy Git, you can access all repos, all user from GitHub when you want.

                        <br /> <br />
                        <img style={{ borderRadius: '50%', height: '170px', width: '170px' }} src='client/styles/octobiwan.jpg' />
                        <br /> <br />
                        When logged you can mark repos to keep them in your profile.
                    </p>
                </ContainerFull>
            </GlobalDiv>
        )
    }
}