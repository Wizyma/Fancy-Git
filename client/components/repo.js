import React, { Component } from 'react'
import { RepoDiv } from '../styles/repo_styles'
import { BackButton } from '../styles/globals'
import { api } from '../utils/api'
import { SingleRepo } from './subcomponents/clicked_repo'
import { Loading } from './loading'



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
      .then(results => this.setState({ repository: results.data.repository, error: results.errors }))

  {/* api.getMediumPosts('react')
    .then(datas => console.log(datas)) */} 
  }

  
  render() {
    const { repository, repo, medium, error } = this.state
    return(
      <RepoDiv>
      <BackButton onClick={this.goBack}>Back</BackButton>
          <div style={{ width: '100%' }}>
              {repository && <SingleRepo repo={repository} />}
              {!repo && <h1>NO REPOSITORY SELECTED PLEASE GO BACK</h1>}
              {repo && !repository && <Loading speed={500} text='Loading' />}
          </div>
      </RepoDiv>
    )  
  }
}
