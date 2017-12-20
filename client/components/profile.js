import React, { Component } from 'react'
import { api } from '../utils/api'
import { BuildProfileRepo } from './subcomponents/result_repo_search'
import { Loading } from './loading'

export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            favorites: null
        }
    }


    componentDidMount() {
        const id = localStorage.getItem('user')
        api.getUserFav({ userid: id })
            .then((res) => {
                if (res.data.status !== 400) {
                    const favs = res.data
                    let requests
                    if (favs.length >= 1) {
                        requests = favs.map((elem) => {
                            return api.getProfileRepos(elem.RepoUser, elem.RepoName)
                        })
                        Promise.all(requests)
                            .then(res => {
                                this.setState({ favorites: res })
                            })
                    }
                }
                else {
                    this.setState({ favorites: [] })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div style={{ width: '100%' }}>
                {!this.state.favorites ? <Loading speed={500} text={'Loading'} /> :
                    <div style={{ marginTop: '22px' }}>
                        {this.state.favorites && this.state.favorites.length === 0 ? <div style={{ textAlign: 'center', fontSize: '35px' }}><p>There are no favorites.</p></div> : null}
                        {this.state.favorites && this.state.favorites.map((elem, i) => <BuildProfileRepo key={i} props={elem.data.repository} />)}
                    </div>
                }
            </div>
        )
    }
}
