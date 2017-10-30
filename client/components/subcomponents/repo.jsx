import * as React from 'react'
import { RepoDiv } from '../../styles/repo_styles'
import { BackButton } from '../../styles/globals'




export class Repo extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      repo: props.location.state,
    }

    this.goBack = this.props.history.goBack
  }

  componentDidMount() {
    console.log(this.state)
  }

  
  render() {
    return(
        <RepoDiv>
            <div style={{ width: '100%' }}>
                <BackButton onClick={this.goBack}>Back</BackButton>
            </div>
        </RepoDiv>
    )
  }
}
