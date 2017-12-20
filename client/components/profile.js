import React, { Component } from 'react'
import { api } from '../utils/api'
import { BuildProfileRepo } from './subcomponents/result_repo_search'

export class Profile extends Component {
    constructor(props){
        super(props)

        this.state = {
            favorites: null
        }
    }


    componentDidMount() {
        const id = localStorage.getItem('user')
        api.getUserFav({ userid: id })
            .then((res) => {
                console.log(res.data)
                if(res.data.status !== 400){
                    const favs = res.data
                    let requests
                    if(favs.length >= 1){
                        requests = favs.map((elem) => {
                            console.log(elem)
                            return api.getProfileRepos(elem.RepoUser, elem.RepoName)
                        })
    
                        Promise.all(requests)
                            .then(res => {
                                this.setState({ favorites: res })
                            })
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    render(){
        console.log(this.state)
        return(
            <div style={{ width: '100%' }}>

            <div style={{ marginTop: '62px' }}>
                {this.state.favorites && this.state.favorites.map((elem, i) => <BuildProfileRepo key={i} props={ elem.data.repository } />) }
            </div>
        </div>
        )
    }
}
