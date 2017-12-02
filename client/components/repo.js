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
        error: null
      } 
    }

    this.goBack = () =>  props.history.goBack()
    
  }

  componentDidMount() {
    const { login, name } = this.state.repo

    api.getClickedRepository(login, name)
    .then(res => {
      if(res.data.repository.stargazers.totalCount >= 20000){
        return {tofetch: res.data.repository.name, data}
      }
      return {tofetch: res.data.repository.primaryLanguage.name, repository: res}
    })
    .then(obj => {
      console.log(obj.tofetch)
      api.getMediumPosts(obj.tofetch.toLowerCase())
        .then(posts => console.log('YOO', posts) || this.setState({repository: obj.repository.data.repository, error: obj.repository.errors, medium: posts ?posts.data.allPosts: null}))
    })

  {/* api.getMediumPosts('react')
    .then(datas => console.log(datas)) */} 
  }

  
  render() {
    console.log(this.state)
    const { repository, repo, medium, error } = this.state
    return(
      <RepoDiv>
      <BackButton onClick={this.goBack}>Back</BackButton>
          <div style={{ width: '100%' }}>
              {repository && <SingleRepo repo={repository} medium={medium} />}
              {medium && <RepoPosts medium={medium} />}
              {!repo && <h1>NO REPOSITORY SELECTED PLEASE GO BACK</h1>}
              {repo && !repository && <Loading speed={500} text='Loading' />}
          </div>
      </RepoDiv>
    )  
  }
}
