import * as React from 'react'
import { RepoDiv } from '../../styles/repo_styles'
import { BackButton } from '../../styles/globals'



interface RepoProps extends React.Props<any> {
  history: {
    goBack: React.Props<History>|undefined,
  },
  location: {
    state: object,
  }
}
  
interface RepoState {
  repo: object
}

export class Repo extends React.Component<RepoProps, RepoState> {
  private goBack: React.Props<History>|any

  constructor(props: RepoProps) {
    super(props)

    this.state = {
      repo: props.location.state,
    }

    this.goBack = () =>  window.location.href = '/'
  }

  componentDidMount() {
    console.log(this.state)
  }

  
  render() {
    if (this.state.repo) {
      return(
        <RepoDiv>
            <div style={{ width: '100%' }}>
                <BackButton onClick={this.goBack}>Back</BackButton>
            </div>
        </RepoDiv>
      )
    }
    return (
      <RepoDiv>
        <h1>NO REPOSITORY SELECTED PLEASE GO BACK</h1>
        <BackButton onClick={this.goBack}>Back</BackButton>
      </RepoDiv>
    )
  }
}
