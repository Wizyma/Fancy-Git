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
      console.log('res.data', res.data)
      if(res.data.repository !== null){
      if(res.data.repository.stargazers.totalCount >= 20000 ){
        return {tofetch: res.data.repository.name, repository: res}
      
      }
    
      return {tofetch: res.data.repository.primaryLanguage.name, repository: res}
    }else{
      return {tofetch: null}
    }
    })
    .then(obj => {
      console.log('obj',obj)
      if(obj.tofetch !== null){
      api.getMediumPosts(obj.tofetch.toLowerCase())
        .then(posts => this.setState({repository: obj.repository.data.repository, error: obj.repository.errors, medium: posts ?posts.data.allPosts: null}))
      }else{
        this.setState({repository: null, error: "pas de repo", medium: null})
      }
      })

  {/* api.getMediumPosts('react')
    .then(datas => console.log(datas)) */} 
  }


  
  render() {
    console.log(this.state)
    const { repository, repo, medium, error } = this.state
  console.log('error', error)
    return(
      <RepoDiv>
      <BackButton onClick={this.goBack}>Back</BackButton>
          <div style={{ width: '100%' }}>
              {error === "pas de repo" ? <h1>Error : Repo not found</h1> :
              <div>
               {repository && <SingleRepo repo={repository} medium={medium} />}
               {medium &&<RepoPosts medium={medium} />}
               <Loading speed={500} text='Loading' />
               </div>
               
               }
          
          </div>
      </RepoDiv>
    )  
  }
}
