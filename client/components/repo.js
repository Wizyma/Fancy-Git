import React, { Component } from 'react'
import { RepoDiv } from '../styles/repo_styles'
import { BackButton } from '../styles/globals'
import { api } from '../utils/api'
import { SingleRepo } from './subcomponents/clicked_repo'
import { Loading } from './loading'
import { RepoPosts } from './subcomponents/clicked_repo'



export class Repo extends Component {
  constructor(props) {
    super(props)

    if (props.location) {
      this.state = {
        repo: props.location.state,
        repository: null,
        medium: null,
        error: null,

      }
    }


    this.goBack = () => props.history.goBack()

  }

  componentDidMount() {
    const { login, name, destroy } = this.state.repo

    api.getClickedRepository(login, name)
      .then(res => {
        if (res.data.repository !== null) {
          if (res.data.repository.stargazers.totalCount >= 20000) {
            return { tofetch: res.data.repository.name, repository: res }
          }

          return { tofetch: res.data.repository.primaryLanguage.name, repository: res }
        }
        return { tofetch: null }
      })
      .then(obj => {
        if (obj.tofetch !== null) {
          api.getMediumPosts(obj.tofetch.toLowerCase())
            .then(posts => this.setState({ repository: obj.repository.data.repository, error: obj.repository.errors, medium: posts ? posts.data.allPosts : null }))
        } else {
          this.setState({ repository: null, error: "pas de repo", medium: null })
        }
      })

    {/* api.getMediumPosts('react')
    .then(datas => console.log(datas)) */}
    const id = localStorage.getItem('user')
    const isLogged = localStorage.getItem('logged')


    if (isLogged) {
      api.getUserFav({ userid: id }).then((res => {
  
        if (res.data.status === 400) {
          return this.setState({
            destroy: true,
            favText: 'Add to favourite'
          });
        }
        
        if(res.data.find((e, i) => e.RepoName === this.state.repo.name && e.RepoUser === this.state.repo.login)){
          console.log('wtf frereeeeeeeeeeeeeeeeeeeeee', this.state)
          return this.setState({

            destroy: false,
            favText: 'Delete From favourite'
          });
        }
        return this.setState({
          destroy: true,
          favText: 'Add to favourite'
        });
      }))
    }

  


  }

  handleFavourite = () => {
    const { login, name } = this.state.repo
    const user = {
      userID: localStorage.getItem('user'),
      repo: name,
      login

    }

    api.manageFavs(user)
      .then(res => {
      
        if(res.data.destroy === true){
          this.setState({
            destroy: true
          }, () => {
            this.setState({ favText: 'Add to favourite' })
          });
        }else{
          this.setState({
            destroy: false
          }, () => {
            this.setState({ favText: 'Delete From favourite' })
          });
        }
        this.setState({ destroy: res.data.destroy })
      })

  

  }


  render() {
    const { repository, repo, medium, error, favText, destroy } = this.state
    return (
      <RepoDiv>
        <BackButton onClick={this.goBack}>Back</BackButton>
        <div style={{ width: '100%' }}>
          {error === "pas de repo" ? <h1>Error : Repo not found</h1> :
            <div>
              {repository && <SingleRepo favText={favText} handleFavourite={this.handleFavourite} repo={repository} medium={medium} />}
              {medium && <RepoPosts medium={medium} />}
             {!repository && <Loading speed={500} text='Loading' />}
            </div>

          }

        </div>
      </RepoDiv>
    )
  }
}
