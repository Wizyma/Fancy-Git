import React, { Component } from 'react'
import { RepoDiv } from '../styles/repo_styles'
import { BackButton } from '../styles/globals'
import { api } from '../utils/api'
import { SingleRepo, RepoPosts } from './subcomponents/clicked_repo'
import { Loading } from './loading'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';



class Repo extends Component {
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
    const { destroy } = this.state.repo
    console.log('Mounted')
    /*
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
            .catch(err => console.log(err))
        } else {
          this.setState({ repository: null, error: "pas de repo", medium: null })
        }
      })
      .catch(err => console.log(err))
      */
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'next')
    const id = localStorage.getItem('user')
    const isLogged = localStorage.getItem('logged')
    if (isLogged === 'true') {
      api.getUserFav({ userid: id }).then((res => {
  
        if (res.data.status === 400) {
          return this.setState({
            destroy: true,
            favText: 'Add to favourite'
          });
        }
        
        if(res.data.find((e, i) => e.RepoName === this.state.repo.name && e.RepoUser === this.state.repo.login)){
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
    const { CLICKED_QUERY } = this.props
    return (
      <RepoDiv>
        <BackButton onClick={this.goBack}>Back</BackButton>
        <div style={{ width: '100%' }}>
          {error === "pas de repo" ? <h1>Error : Repo not found</h1> :
            <div>
              {CLICKED_QUERY.repository && <SingleRepo favText={favText} handleFavourite={this.handleFavourite} repo={CLICKED_QUERY.repository} medium={medium} />}
              {medium && <RepoPosts medium={medium} />}
             {!CLICKED_QUERY.repository && <Loading speed={500} text='Loading' />}
            </div>

          }

        </div>
      </RepoDiv>
    )
  }
}

const CLICKED_REPO_QUERY = gql`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      createdAt
      name
      owner {
        avatarUrl
        login
      }
      stargazers(first: 1) {
        totalCount
      }
      hasIssuesEnabled
      description
      defaultBranchRef {
        name
      }
      collaborators(first: 50) {
        nodes {
          login
          avatarUrl
        }
      }
      isFork
      projects(first: 10) {
        totalCount
        nodes {
          name
          state
          creator {
            login
          }
        }
      }
      viewerCanSubscribe
      viewerHasStarred
      id
      repositoryTopics(first: 50) {
        nodes {
          topic {
            name
          }
          url
        }
      }
      licenseInfo {
        name
      }
      hasWikiEnabled
      primaryLanguage {
        name
        color
      }
      issues(first: 50, states: OPEN) {
        nodes {
          author {
            avatarUrl
            login
          }
          createdAt
          id
          assignees(first: 10) {
            nodes {
              login
            }
          }
        }
      }
    }
  }
`

export default graphql(CLICKED_REPO_QUERY, {
  name: 'CLICKED_QUERY',
  options: ({ location }) => {
    const owner = location.state.login
    const name = location.state.name
    return {
      errorPolicy: 'ignore',
      variables: { owner, name }
    }
  },
})(Repo)
